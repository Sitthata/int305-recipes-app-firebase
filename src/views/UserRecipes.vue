<template>
  <main v-if="userId">
    <h1 class="text-3xl">User Recipe</h1>
    <div class="grid grid-cols-4 w-full">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </main>
</template>

<script setup>
import RecipeCard from '@/components/RecipeCard.vue'
import db from '@/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const recipes = ref([])
const userId = computed(() => route.params.userId ?? '')

async function getRecipes() {
  // const currentUserId = route.params.userId ?? ''
  const recipesCollection = collection(db, 'recipes')
  const qry = query(recipesCollection, where('authorId', '==', userId.value))
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

watch(userId, () => getRecipes())
</script>

<style lang="scss" scoped></style>
