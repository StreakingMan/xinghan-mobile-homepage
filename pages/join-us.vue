<script setup lang="ts">
import { jobs } from '~/site-data/jobs';
</script>

<template>
    <template v-for="(job, idx) of jobs" :key="idx">
        <h2 class="font-bold text-2xl text-center">{{ job.title }}</h2>
        <Card
            v-for="({ title, content }, i) of job.desc"
            :key="i"
            :title="title"
            :content="content"
        />
    </template>
</template>

<style scoped></style>
