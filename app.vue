<script setup lang="ts">
const route = useRoute();
const active = ref(route.path.replace('/', '') || 'home');
watch(active, (value) => {
    navigateTo({ path: `/${value}` });
});

const tabs = [
    {
        name: 'home',
        text: '公司简介',
        icon: 'home-o',
    },
    {
        name: 'product',
        text: '旗下产品',
        icon: 'chart-trending-o',
    },
    {
        name: 'reserve',
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
    <NuxtLayout>
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
