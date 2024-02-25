<script setup lang="ts">
import { riskDetail } from '~/site-data/risk-detail';
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { LegendComponent } from 'echarts/components';

use([LineChart, LegendComponent]);

const { data } = await useFetch('/api/risk-system', {
    server: false,
});

const systems = computed(() => {
    if (!data.value) return [];
    return (data.value as any).map((s: any) => {
        const option = {
            color: ['#d14a61', '#333', '#6ca1d3'],
            legend: {
                data: [
                    { name: s.signalTend.label, icon: 'rect' },
                    ...s.profitTends.map((i: any) => ({
                        name: i.label,
                        icon: 'rect',
                    })),
                ],
                textStyle: { color: 'black' },
                itemWidth: 24,
                itemHeight: 2,
            },
            grid: {
                left: 0,
                right: 0,
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
                    min(value: any) {
                        return value.min * 0.95;
                    },
                    max(v: any) {
                        return v.max * 1.05;
                    },
                },
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
                    min(value: any) {
                        return value.min * 0.95;
                    },
                    max(v: any) {
                        return v.max * 1.05;
                    },
                },
            ],
            series: [
                {
                    symbol: 'none',
                    name: s.signalTend.label,
                    type: 'line',
                    data: s.signalTend.data,
                    lineStyle: { width: 1 },
                },
                ...s.profitTends.map((i: any) => ({
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
            ...s,
            option,
        };
    });
});
</script>

<template>
    <Card :title="riskDetail.title" :content="riskDetail.desc" />

    <div v-for="s in systems" :key="s.title" class="flex flex-col gap-2">
        <CommonTitle>{{ s.title }}</CommonTitle>

        <client-only>
            <VChart class="h-[200px]" :option="s.option" />
        </client-only>

        <VanRow class="text-zinc-600 text-center" gutter="12">
            <template v-for="({ title, desc }, idx) in s.infos" :key="idx">
                <VanCol span="8">
                    <div class="bg-gray-200 py-3 rounded">
                        <div class="text-sm">{{ title }}</div>
                        <div class="font-bold text-lg">{{ desc }}</div>
                    </div>
                </VanCol>
            </template>
        </VanRow>

        <div
            class="font-normal leading-relaxed text-zinc-600 mb-4 text-justify"
        >
            {{ s.desc }}
        </div>
    </div>
</template>

<style scoped></style>
