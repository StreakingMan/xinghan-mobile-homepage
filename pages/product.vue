<script setup lang="ts">
import VChart from 'vue-echarts';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { LegendComponent } from 'echarts/components';
import { statement } from '~/site-data/statement';
import { xAxisTimeFormatter } from '~/utils/x-axis-time-formatter';

use([LineChart, LegendComponent]);

const BACKDRAW_NAME = '动态回撤';
const COMPARE_NAME = '同期中证500';

const { data } = await useFetch('/api/product', {
    server: false,
});

const products = computed(() => {
    if (!data.value) return [];
    return (data.value as any).map((p: any) => {
        const option = {
            color: ['#d14a61', '#333', '#6ca1d3'],
            legend: {
                data: [
                    { name: p.title, icon: 'rect' },
                    { name: COMPARE_NAME, icon: 'rect' },
                    { name: BACKDRAW_NAME, icon: 'rect' },
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
                    interval: 1,
                    formatter: xAxisTimeFormatter(p.timeTend),
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
                        // 转化为百分比，保留两位小数
                        formatter: (value: number) => {
                            return (value * 100).toFixed(2) + '%';
                        },
                    },
                    splitLine: { show: false },
                    min: -1.0,
                    max: 'dataMax',
                },
            ],
            series: [
                {
                    symbol: 'none',
                    name: p.title,
                    type: 'line',
                    data: p.netAssetValueTend,
                    lineStyle: { width: 2 },
                },
                {
                    symbol: 'none',
                    name: COMPARE_NAME,
                    type: 'line',
                    data: p['500valueTend'],
                    lineStyle: { width: 1 },
                },
                {
                    symbol: 'none',
                    name: BACKDRAW_NAME,
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
    <div v-for="p in products" :key="p.title" class="flex flex-col gap-12">
        <CommonTitle>{{ p.title }}</CommonTitle>

        <client-only>
            <VChart class="h-[200px]" :option="p.option" />
        </client-only>

        <VanRow class="text-zinc-600 text-center mt-6 mb-6" gutter="12">
            <template
                v-for="({ title, value }, idx) in [
                    { title: '成立时间', value: '2024.03.05' },
                    { title: '产品类型', value: p.riskType || '未知' },
                    { title: '风险等级', value: '稳健型' },
                    { title: '累计收益', value: parseFloat(p.acc.slice(0, -1)) / 100 + 1 },
                    { title: '今年以来收益', value: p.yearAcc },
                    { title: '年化收益', value: p.yearAcc },
                ]"
                :key="idx"
            >
                <VanCol span="8">
                    <div class="bg-gray-200 py-3 rounded">
                        <div class="text-sm">{{ title }}</div>
                        <div class="font-bold text-lg">{{ value }}</div>
                    </div>
                </VanCol>
            </template>
        </VanRow>
    </div>

    <div class="font-normal leading-relaxed text-zinc-600 mb-4 text-justify">
        {{ statement }}
    </div>
</template>

<style scoped></style>
