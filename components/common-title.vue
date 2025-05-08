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
        
        <span class="relative">
            <slot />
        </span>
        
    </div>
</template>
