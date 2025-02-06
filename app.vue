<script setup lang="ts">
const route = useRoute();
const active = ref(route.path.replace('/', '') || 'home');
watch(active, (value) => {
    navigateTo({ path: `/${value}` });
});

</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
