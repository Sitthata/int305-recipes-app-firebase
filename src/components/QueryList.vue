<template>
    <div role="tablist" class="tabs tabs-boxed">
        <RouterLink v-for="query in queryData" :key="query.id" role="tab" class="tab" :to="`/recipes/${query.id}`">
            {{ query.header }}
        </RouterLink>
    </div>
</template>

<script setup>
import queryData from '@/data/queryData';
</script>

<style lang="scss" scoped></style>