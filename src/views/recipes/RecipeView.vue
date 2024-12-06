<template>
  <div class="w-full container mx-auto">
    <h1 class="text-3xl">Recipes View</h1>
    <QueryList />
    <div class="grid grid-cols-4 w-full">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </div>
</template>

<script setup>
import QueryList from '@/components/QueryList.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import db from '@/firebase'
import { collection, getDocs, query, doc as document, getDoc } from 'firebase/firestore'
import { onMounted, ref } from 'vue'
import queryData from '@/data/queryData'

const recipes = ref([])

async function getRecipes() {
  const recipesCollection = collection(db, 'recipes')
  const qry = query(recipesCollection)
  const recipesSnapshot = await getDocs(qry)

  recipes.value = []

  for (const doc of recipesSnapshot.docs) {
    const recipe = {
      id: doc.id,
      ...doc.data(),
    }

    const categoryRef = document(db, 'categories', recipe.categoryId)
    const categorySnap = await getDoc(categoryRef)
    if (categorySnap.exists()) {
      // Attach category data to the recipe
      recipe.category = { id: categorySnap.id, ...categorySnap.data() }
    } else {
      // Handle cases where the category doesn't exist
      recipe.category = null
    }

    recipes.value.push(recipe)
  }

}

onMounted(() => {
  getRecipes()
})
</script>
