<template>
  <div role="tablist" class="tabs tabs-boxed">
    <RouterLink
      v-for="query in queryData"
      :key="query.id"
      role="tab"
      class="tab"
      :class="{ 'tab-active': qryId === query.id }"
      :to="`/recipes/${query.id}`"
    >
      {{ query.header }}
    </RouterLink>
  </div>
</template>

<script setup>
import queryData from '@/data/queryData'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const qryId = computed(() => Number(route.params.queryId))
</script>

<style lang="scss" scoped></style>
