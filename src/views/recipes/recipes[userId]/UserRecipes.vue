<template>
  <div>User Recipe</div>
</template>

<script setup>
import db from '@/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const recipes = ref([])
const userId = route.params.userId ?? ''

async function getRecipes() {
  const recipesCollection = collection(db, 'recipes')
  const qry = query(recipesCollection, where('userId', '==', userId))
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
