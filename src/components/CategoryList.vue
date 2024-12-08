<template>
  <div role="tablist" class="tabs tabs-boxed">
    <RouterLink
      v-for="(category, index) in categories"
      :key="index"
      role="tab"
      class="tab"
      :class="{ 'tab-active': qryId === category.id }"
      :to="`/recipes/${category.id}`"
    >
      {{ category.name }}
    </RouterLink>
  </div>
</template>

<script setup>
import db from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
const qryId = computed(() => route.params.queryId)

const categories = ref([])

async function getCategories() {
  const categoriesSnap = await getDocs(collection(db, 'categories'))
  categories.value = categoriesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  console.log(categories.value)
}

onMounted(() => {
  getCategories()
})
</script>

<style lang="scss" scoped></style>
