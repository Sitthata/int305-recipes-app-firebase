<template>
  <div class="card bg-base-100 shadow-xl space-y-5">
    <div class="card-body">
      <h2 class="card-title">{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <div class="card-actions">
        <RouterLink class="btn btn-primary" :to="`/${user.id}`">Browse Recipes</RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';

defineProps({
  user: Object,
})
</script>

<style scoped></style>
