<template>
  <main class="container mx-auto">
    <h1 class="text-3xl">Home View</h1>
    <RouterLink to="/recipes" class="btn btn-primary">Browse All Recipes</RouterLink>
    <h1 class="text-3xl">User Recipes</h1>
    <section class="grid grid-cols-4 gap-7">

      <UserCard v-for="user in users" :key="user.id" :user="user" />
    </section>
  </main>
</template>

<script setup>
import { collection, getDocs } from 'firebase/firestore'
import { onMounted, ref } from 'vue'
import UserCard from '@/components/UserCard.vue';
import db from '@/firebase';

const users = ref([])

const getUsers = async () => {
  const userCollection = collection(db, 'users')
  const userSnapshot = await getDocs(userCollection)

  users.value = userSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  })

  console.log(users.value)
}

onMounted(() => {
  getUsers()
})
</script>
