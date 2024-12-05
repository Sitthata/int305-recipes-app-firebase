<template>
  <div class="card bg-base-100 shadow-xl space-y-5">
    <div class="card-body">
      <h2 class="card-title">{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <div class="card-actions">
        <a class="btn btn-primary" :href="`/recipes/${user.id}`">Browse Recipes</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  user: Object,
})
</script>

<style scoped></style>
