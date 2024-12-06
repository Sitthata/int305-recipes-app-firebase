<template>
    <div>

    </div>
</template>

<script setup>
import db from '@/firebase';
import { collection, query, where } from 'firebase/firestore';

const recipesRef = collection(db, 'recipes');

const queryData = [
    {
        id: 1,
        header: 'high rating',
        q: query(recipesRef, where('rating', '>=', 4))
    },
    {
        id: 2,
        header: 'vegetarian',
        q: query(recipesRef, where('vegetarian', '==', true))
    },
    {
        id: 3,
        header: 'with sugar',
        q: query(recipesRef, where('ingredients', 'array-contains', 'Sugar'))
    }
]
</script>

<style lang="scss" scoped></style>