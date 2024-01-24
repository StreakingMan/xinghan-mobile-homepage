<script setup lang="ts">
import { homeCards } from '~/site-data/home-cards';

definePageMeta({
    alias: '/',
});
</script>

<template>
    <Card
        v-for="card in homeCards"
        :key="card.title"
        :title="card.title"
        :content="card.content"
    />
</template>

<style scoped></style>
