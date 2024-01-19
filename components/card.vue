<script setup lang="ts">
import { showImagePreview } from 'vant';

defineProps<{
    title: string;
    content: string[];
}>();

const previewImage = (url: string) => {
    showImagePreview([url]);
};
</script>

<template>
    <div>
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
            <span class="relative"> {{ title }}</span>
            <span class="h-2 w-2 bg-white rotate-45"></span>
            <span class="h-[1px] w-[60px] bg-white"></span>
        </div>
        <div class="font-normal leading-relaxed flex flex-col gap-2 py-2">
            <template v-for="(item, index) in content" :key="index">
                <img
                    v-if="item.startsWith('<image>')"
                    :src="item.slice(7)"
                    class="w-full"
                    alt=""
                    @click="previewImage(item.slice(7))"
                />
                <p v-else>{{ item }}</p>
            </template>
        </div>
    </div>
</template>
