<script setup lang="ts">
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { LegendComponent } from 'echarts/components';

use([LineChart, LegendComponent]);

const { data } = await useFetch('/api/product');
const products = computed(() => {
    if (!data.value) return [];
    return (data.value as any).map((p: any) => {
        const option = {
            color: ['#d14a61', '#333', '#6ca1d3'],
            legend: {
                data: [
                    { name: p.title, icon: 'rect' },
                    { name: p.compareTitle, icon: 'rect' },
                    { name: '最大回撤', icon: 'rect' },
                ],
                textStyle: { color: 'black' },
                itemWidth: 24,
                itemHeight: 2,
            },
            grid: {
                left: 0,
                right: 0,
                bottom: 0,
                top: 24,
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: p.timeTend,
                axisLabel: {
                    color: '#666',
                    interval: 10000000,
                    showMinLabel: true,
                    showMaxLabel: true,
                    align: 'center',
                    fontSize: 10,
                    formatter: (v: string) => v.replaceAll('-', '/'),
                },
                boundaryGap: false,
                axisTick: { show: false },
            },
            yAxis: [
                {
                    type: 'value',
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: { color: '#666' },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: '#999',
                        },
                    },
                    min: 'dataMin',
                    max: 'dataMax',
                },
                {
                    type: 'value',
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: { color: '#6ca1d3' },
                    splitLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: '#6ca1d3',
                        },
                    },
                    min: 0,
                    max: 1,
                },
            ],
            series: [
                {
                    symbol: 'none',
                    name: p.title,
                    type: 'line',
                    data: p.netAssetValueTend,
                    lineStyle: { width: 1 },
                },
                {
                    symbol: 'none',
                    name: p.compareTitle,
                    type: 'line',
                    data: p['500valueTend'],
                    lineStyle: { width: 1 },
                },
                {
                    symbol: 'none',
                    name: '最大回撤',
                    type: 'line',
                    yAxisIndex: 1,
                    data: p['500valueTend'].map(() =>
                        (0.5 + 0.1 * Math.random()).toFixed(3),
                    ),
                    lineStyle: { width: 1 },
                },
            ],
        };
        return {
            ...p,
            option,
        };
    });
});
</script>

<template>
    <div v-for="p in products" :key="p.title" class="flex flex-col gap-2">
        <MoonTitle>{{ p.title }}</MoonTitle>
        <div class="relative">
            <client-only>
                <VChart class="h-[200px]" :option="p.option" />
            </client-only>
        </div>
        <VanRow class="text-zinc-600 text-center">
            <template
                v-for="({ title, value }, idx) in [
                    { title: '累计收益', value: p.acc },
                    { title: '今年以来收益', value: p.yearAcc },
                    { title: '产品风险类型', value: '超高风险' },
                    { title: '基金经理', value: p.manager },
                    { title: '成立日期', value: p.createdAt },
                    { title: '认购起点', value: 'RMB ' + p.startingPoint },
                ]"
                :key="idx"
            >
                <VanCol span="8">
                    <div class="text-sm">{{ title }}</div>
                    <div class="font-bold text-lg">{{ value }}</div>
                </VanCol>
            </template>
        </VanRow>
    </div>

    <div class="font-normal leading-relaxed text-zinc-600 mb-4">
        补充申明：因我司2023年11月基金产品策略重大调整，全面转型量化对冲策略体系，故上图展示净值为2023年11月1日归1化后的折算净值，若想查阅基金产品成立以来完整净值可联系我司或者登录私募排排网官网查阅。
    </div>
</template>

<style scoped></style>
