<script setup lang="ts">
const active = ref('home');
watch(active, (value) => {
    navigateTo({ path: `/${value}` });
});
const currentTitle = computed(() => {
    const tab = tabs.find((tab) => tab.name === active.value);
    return tab ? tab.text : '';
});

const tabs = [
    {
        name: 'home',
        text: '公司简介',
        icon: 'home-o',
    },
    {
        name: 'products',
        text: '旗下产品',
        icon: 'chart-trending-o',
    },
    {
        name: 'subscription',
        text: '产品认购',
        icon: 'cash-o',
    },
    {
        name: 'join-us',
        text: '招贤纳士',
        icon: 'friends-o',
    },
];
</script>

<template>
    <NuxtLayout :title="currentTitle">
        <NuxtPage />
    </NuxtLayout>
    <van-tabbar v-model="active">
        <van-tabbar-item
            v-for="tab in tabs"
            :key="tab.name"
            :icon="tab.icon"
            :name="tab.name"
        >
            {{ tab.text }}
        </van-tabbar-item>
    </van-tabbar>
</template>
