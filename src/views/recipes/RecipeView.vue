<template>
  <div class="w-full container mx-auto">
    <div class="flex items-center justify-between py-3">
      <h1 class="text-3xl">Recipes View</h1>
      <RouterLink :to="{ name: 'home' }"><span class="text-2xl">back</span></RouterLink>
    </div>

    <QueryList />
    <CategoryList />
    <div class="grid grid-cols-4 w-full">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </div>
</template>

<script setup>
import CategoryList from '@/components/CategoryList.vue'
import QueryList from '@/components/QueryList.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import queryData from '@/data/queryData'
import db from '@/firebase'
import { collection, getDocs, query, doc as document, getDoc, where } from 'firebase/firestore'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const queryId = computed(() => route.params.queryId || undefined)

const recipes = ref([])

async function getRecipes() {
  const recipesCollection = collection(db, 'recipes')
  const qry = query(recipesCollection)
  const recipesSnapshot = await getDocs(qry)

  const getAllDocument = async () => {
    const localRecipe = []
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
      localRecipe.push(recipe)
    }
    console.log(localRecipe)
    return localRecipe
  }

  if (!queryId.value || queryId.value === 1) {
    recipes.value = await getAllDocument()
    return
  }

  if (queryId.value.includes('category')) {
    const qry = query(collection(db, 'recipes'), where('categoryId', '==', queryId.value))
    const recipesSnap = await getDocs(qry)
    recipes.value = recipesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return
  }

  const currentQuery = queryData.find((obj) => obj.id == queryId.value).q
  const recipesSnap = await getDocs(currentQuery)

  if (queryId.value) recipes.value = recipesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  console.log(recipes.value)
}

onMounted(() => {
  getRecipes()
})

watch(queryId, () => getRecipes())
</script>
