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
                top: 30,
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
                    min: 'dataMin',
                    max: 'dataMax',
                },
                {
                    type: 'value',
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: {
                        color: '#666',
                        // 转化为百分比，保留两位小数
                        formatter: (value: number) => {
                            return (value * 100).toFixed(2) + '%';
                        },
                    },
                    splitLine: { show: false },
                    min: -0.3,
                    max: 'dataMax',
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
                    data: p.maxDrawdownTend,
                    lineStyle: { width: 1, type: 'dashed' },
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
                    { title: '产品风险类型', value: p.riskType || '未知' },
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
