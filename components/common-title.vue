<script setup lang="ts">
//
</script>

<template>
    <div
        class="h-10 text-white text-base px-5 relative flex items-center justify-center overflow-hidden bg-cover mb-2"
        :style="{
            backgroundImage: 'url(/star-sky.png)',
        }"
    >
        <span class="relative">
            <slot />
        </span>
    </div>
</template>
