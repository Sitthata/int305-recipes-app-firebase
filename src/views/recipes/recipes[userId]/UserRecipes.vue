<template>
  <main>
    <div class="grid grid-cols-4 w-full">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </main>
</template>

<script setup>
import RecipeCard from '@/components/RecipeCard.vue'
import db from '@/firebase'
import { collection, getDocs, query, where, doc as document, getDoc } from 'firebase/firestore'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const recipes = ref([])
const userId = route.params.userId ?? ''

async function getRecipes() {
  const recipesCollection = collection(db, 'recipes')
  const qry = query(recipesCollection, where('authorId', '==', userId))
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

<style lang="scss" scoped></style>
