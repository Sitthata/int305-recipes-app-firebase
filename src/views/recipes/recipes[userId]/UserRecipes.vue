<template>
  <div class="grid grid-cols-4 w-full">
    <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
  </div>
</template>

<script setup>
import RecipeCard from '@/components/RecipeCard.vue'
import db from '@/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const recipes = ref([])
const userId = route.params.userId ?? ''

async function getRecipes() {
  const recipesCollection = collection(db, 'recipes')
  const qry = query(recipesCollection, where('authorId', '==', userId))
  const recipesSnapshot = await getDocs(qry)

  recipes.value = recipesSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  })
  console.log(recipes.value)
}

onMounted(() => {
  getRecipes()
})
</script>

<style lang="scss" scoped></style>
