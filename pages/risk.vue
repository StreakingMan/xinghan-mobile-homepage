<script setup lang="ts">
import { riskDetail } from '~/site-data/risk-detail';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { LineChart, BarChart } from 'echarts/charts';
import { LegendComponent } from 'echarts/components';

use([LineChart, BarChart, LegendComponent]);

const { data } = await useFetch('/api/risk-system', {
    server: false,
});

interface System {
    title: string;
    desc: string;
    infoTitle: string;
    infos: { title: string; desc: string }[];
    signalTitle: string;
    signalOption: any;
    valueTitle: string;
    valueOption: any;
}
const systems = computed(() => {
    if (!data.value) return [] as System[];
    return (data.value as any).map((s: any) => {
        let signalOption;
        if (s.signalTitle && s.signalTends) {
            signalOption = {
                color: ['#d14a61', '#6ca1d3'],
                legend: {
                    data: s.signalTends.map((i: any) => ({
                        name: i.label,
                        icon: 'rect',
                    })),
                    textStyle: { color: 'black' },
                    itemWidth: 24,
                    itemHeight: 2,
                },
                grid: {
                    left: -40,
                    right: 0,
                    bottom: 0,
                    top: 30,
                    containLabel: true,
                },
                xAxis: {
                    type: 'category',
                    data: s.signalTimeTend,
                    axisLabel: {
                        color: '#666',
                        interval: 10000000,
                        showMinLabel: true,
                        showMaxLabel: true,
                        align: 'center',
                        fontSize: 10,
                    },
                    axisLine: { show: false },
                    boundaryGap: false,
                    axisTick: { show: false },
                },
                yAxis: [
                    {
                        type: 'value',
                        axisLine: { show: false },
                        axisTick: { show: false },
                        axisLabel: {
                            color: '#666',
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#eee',
                            },
                        },
                        min(v: any) {
                            return v.min > 0 ? v.min * 0.95 : v.min * 1.05;
                        },
                        max(v: any) {
                            return v.max > 0 ? v.max * 1.05 : v.max * 0.95;
                        },
                    },
                    {
                        type: 'value',
                        axisLine: { show: false },
                        axisTick: { show: false },
                        axisLabel: {
                            color: '#666',
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#eee',
                            },
                        },
                        min(v: any) {
                            return v.min > 0 ? v.min * 0.95 : v.min * 1.05;
                        },
                        max(v: any) {
                            return v.max > 0 ? v.max * 1.2 : v.max * 0.8;
                        },
                    },
                ],
                series: [
                    ...s.signalTends.slice(0, -1).map((i: any) => ({
                        symbol: 'none',
                        name: i.label,
                        type: 'line',
                        data: i.data,
                        yAxisIndex: 0,
                        lineStyle: { width: 1 },
                    })),
                    ...s.signalTends.slice(-1).map((i: any) => ({
                        symbol: 'none',
                        name: i.label,
                        type: 'bar',
                        data: i.data,
                        yAxisIndex: 1,
                        barWidth: 2,
                    })),
                ],
            };
        }
        const valueOption = {
            color: ['#d14a61', '#6ca1d3', '#333'],
            legend: {
                data: s.valueTends.map((i: any) => ({
                    name: i.label,
                    icon: 'rect',
                })),
                textStyle: { color: 'black' },
                itemWidth: 24,
                itemHeight: 2,
            },
            grid: {
                left: 0,
                right: s.valueTends.length > 2 ? 0 : 34,
                bottom: 0,
                top: 30,
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: s.timeTend,
                axisLabel: {
                    color: '#666',
                    interval: 10000000,
                    showMinLabel: true,
                    showMaxLabel: true,
                    align: 'center',
                    fontSize: 10,
                },
                axisLine: { show: false },
                boundaryGap: false,
                axisTick: { show: false },
            },
            yAxis: [
                {
                    type: 'value',
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: {
                        color: '#666',
                        //保留并填充两位小数
                        formatter: (value: number) => {
                            return value.toFixed(2);
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#eee',
                        },
                    },
                    min(v: any) {
                        return v.min > 0 ? v.min * 0.95 : v.min * 1.05;
                    },
                    max(v: any) {
                        return v.max > 0 ? v.max * 1.05 : v.max * 0.95;
                    },
                },
                s.valueTends.length > 2
                    ? {
                          type: 'value',
                          axisLine: { show: false },
                          axisTick: { show: false },
                          axisLabel: {
                              color: '#666',
                              //保留并填充两位小数
                              formatter: (value: number) => {
                                  return (value * 100).toFixed(2) + '%';
                              },
                          },
                          splitLine: {
                              lineStyle: {
                                  color: '#eee',
                              },
                          },
                          min: -0.9,
                          max: 0,
                      }
                    : null,
            ],
            series: [
                ...s.valueTends.slice(0, 2).map((i: any) => ({
                    symbol: 'none',
                    name: i.label,
                    type: 'line',
                    data: i.data,
                    yAxisIndex: 0,
                    lineStyle: { width: 1 },
                })),
                ...s.valueTends.slice(2).map((i: any) => ({
                    symbol: 'none',
                    name: i.label,
                    type: 'line',
                    data: i.data,
                    yAxisIndex: 1,
                    lineStyle: { width: 1 },
                })),
            ],
        };
        return {
            title: s.title,
            desc: s.desc,
            infoTitle: s.infoTitle,
            infos: s.infos,
            signalTitle: s.signalTitle,
            signalOption,
            valueTitle: s.valueTitle,
            valueOption,
        };
    }) as System[];
});
</script>

<template>
    <template v-for="(detail, idx) of riskDetail" :key="idx">
        <Card :title="detail.title" :content="detail.desc" />
    </template>
    <div v-for="s in systems" :key="s.title" class="flex flex-col gap-2">
        <CommonTitle>{{ s.title }}</CommonTitle>

        <client-only v-if="s.signalOption">
            <div class="section-title">
                {{ s.signalTitle }}
            </div>
            <VChart class="h-[200px]" :option="s.signalOption" />
        </client-only>

        <div class="section-title">
            {{ s.infoTitle }}
        </div>
        <VanRow class="text-zinc-600 text-center" :gutter="[12, 12]">
            <template v-for="({ title, desc }, idx) in s.infos" :key="idx">
                <VanCol span="8">
                    <div
                        class="bg-gray-200 py-3 rounded h-full flex flex-col justify-between"
                    >
                        <div class="text-sm">{{ title }}</div>
                        <div class="font-bold text-lg">{{ desc }}</div>
                    </div>
                </VanCol>
            </template>
        </VanRow>

        <client-only>
            <div class="section-title mt-4">
                {{ s.valueTitle }}
            </div>
            <VChart class="h-[200px]" :option="s.valueOption" />
        </client-only>

        <div
            class="font-normal leading-relaxed text-zinc-600 mb-4 text-justify"
        >
            {{ s.desc }}
        </div>
    </div>
</template>

<style scoped>
.section-title {
    @apply font-normal leading-relaxed text-zinc-600 text-center;
}
</style>
