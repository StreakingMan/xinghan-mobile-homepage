<script setup lang="ts">
//
</script>

<template>
    <div
        class="h-10 text-white text-sm px-5 relative flex items-center justify-between overflow-hidden bg-cover mb-2"
        :style="{
            backgroundImage: 'url(/star-sky.png)',
        }"
    >
        <span class="h-[1px] w-[40px] bg-white"></span>
        <span class="h-2 w-2 bg-white rotate-45"></span>
        <span class="relative">
            <slot />
        </span>
        <span class="h-2 w-2 bg-white rotate-45"></span>
        <span class="h-[1px] w-[40px] bg-white"></span>
    </div>
</template>
