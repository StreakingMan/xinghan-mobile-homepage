<script setup lang="ts">
//
</script>

<template>
    <div
        class="rounded-tl-3xl rounded-br-3xl bg-black h-10 text-white text-lg px-5 relative flex items-center justify-between overflow-hidden"
    >
        <img
            src="/moon.png"
            alt="moon"
            class="absolute h-[200%] top-1/2 left-1/2 opacity-80 -translate-x-1/2 -translate-y-1/2"
        />
        <span class="h-[1px] w-[60px] bg-white"></span>
        <span class="h-2 w-2 bg-white rotate-45"></span>
        <span class="relative">
            <slot />
        </span>
        <span class="h-2 w-2 bg-white rotate-45"></span>
        <span class="h-[1px] w-[60px] bg-white"></span>
    </div>
</template>
