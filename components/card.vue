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
        <CommonTitle>
            {{ title }}
        </CommonTitle>
        <div class="font-normal leading-relaxed flex flex-col gap-2 py-2">
            <template v-for="(item, index) in content" :key="index">
                <img
                    v-if="item.startsWith('<image>')"
                    :src="item.slice(7)"
                    class="w-full"
                    alt=""
                    @click="previewImage(item.slice(7))"
                />
                <p v-else class="text-justify">{{ item }}</p>
            </template>
        </div>
    </div>
</template>
