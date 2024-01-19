<script setup lang="ts">
const { y } = useWindowScroll();
</script>

<template>
    <header
        class="fixed h-[64px] w-full top-0 z-10 bg-white flex items-center justify-center transition-all"
        :class="{
            'drop-shadow-md': y > 0,
        }"
    >
        <img alt="logo" src="/logo-text.png" class="h-[40px] inline-block" />
    </header>
    <main
        class="flex flex-col pt-[64px] pb-[var(--van-tabbar-height)] p-4 gap-4 text-zinc-800"
    >
        <slot />
    </main>
</template>
