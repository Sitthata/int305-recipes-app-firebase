import db from '@/firebase'
import { collection, query, where } from 'firebase/firestore'

const recipesRef = collection(db, 'recipes')

export default [
  {
    id: 1,
    header: 'all recipes',
    q: query(recipesRef),
  },
  {
    id: 2,
    header: 'high rating',
    q: query(recipesRef, where('rating', '>=', 4.5)),
  },
  {
    id: 3,
    header: 'vegetarian',
    q: query(recipesRef, where('isVegetarian', '==', true)),
  },
  {
    id: 4,
    header: 'with sugar',
    q: query(recipesRef, where('ingredients', 'array-contains', { name: 'Sugar', quantity: '150g' })),
  },
]
