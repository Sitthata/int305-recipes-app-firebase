<template>
  <div>

  </div>
</template>

<script setup>
import { collection, getDocs } from 'firebase/firestore';
import db from './firebase';
import { onMounted, ref } from 'vue';

const users = ref([])

const getUsers = async () => {
  const users = collection(db, 'Users')
  const userSnapshot = await getDocs(users)

  users.value = userSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })

  console.log(users.value)
}

onMounted(() => {
  getUsers()
})
</script>

<style lang="scss" scoped></style>