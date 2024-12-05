<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body prose">
      <h2 class="card-title">{{ recipe.title }}</h2>
      <p>{{ recipe.description }}</p>
      <div>
        <h3>Instruction</h3>
        <p>{{ recipe.instructions }}</p>
      </div>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Browse Recipe</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  recipe: Object,
})
</script>

<style lang="scss" scoped></style>
