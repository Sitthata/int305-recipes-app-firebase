import admin from 'firebase-admin'
import serviceAccount from './serviceAccountKey.json'
import users from './data/users.json'
import recipes from './data/recipes.json'
import categories from './data/category.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

async function seed() {
  const userRefs = {}

  // Seed Users with Specific IDs
  const userPromises = users.map(async (user, index) => {
    if (!user.userId || typeof user.userId !== 'string' || user.userId.trim() === '') {
      console.error(`Invalid or missing 'userId' for user at index ${index}:`, user)
      throw new Error(`User at index ${index} has an invalid or missing 'userId' field.`)
    }
    console.log(`Creating user with userId: ${user.userId}`)
    const docRef = db.collection('users').doc(user.userId)
    await docRef.set({
      name: user.name,
      email: user.email,
      favorites: user.favorites,
      createdAt: new Date(user.createdAt),
      isPremium: user.isPremium,
    })
    userRefs[user.userId] = docRef.id
    return docRef
  })
  console.log(userRefs)
  await Promise.all(userPromises)
  console.log('Users imported successfully.')

  const categoryRefs = {}

  // Seed Categories with Specific IDs
  const categoryPromises = categories.map(async (category, index) => {
    if (!category.categoryId || typeof category.categoryId !== 'string' || category.categoryId.trim() === '') {
      console.error(`Invalid or missing 'categoryId' for category at index ${index}:`, category)
      throw new Error(`Category at index ${index} has an invalid or missing 'categoryId' field.`)
    }
    console.log(`Creating category with categoryId: ${category.categoryId}`)
    const docRef = db.collection('categories').doc(category.categoryId)
    await docRef.set({
      name: category.name,
      description: category.description,
      createdAt: new Date(category.createdAt),
    })
    categoryRefs[category.categoryId] = docRef.id
    return docRef
  })
  console.log(categoryRefs)
  await Promise.all(categoryPromises)
  console.log('Categories imported successfully.')

  // Seed Recipes
  const recipePromises = recipes.map(async (recipe, index) => {
    if (!recipe.recipeId || typeof recipe.recipeId !== 'string' || recipe.recipeId.trim() === '') {
      console.error(`Invalid or missing 'recipeId' for recipe at index ${index}:`, recipe)
      throw new Error(`Recipe at index ${index} has an invalid or missing 'recipeId' field.`)
    }

    console.log(`Creating recipe with recipeId: ${recipe.recipeId}`)

    // Ensure that categoryId and authorId exist
    const resolvedCategoryId = categoryRefs[recipe.categoryId]
    const resolvedAuthorId = userRefs[recipe.authorId]

    if (!resolvedCategoryId) {
      throw new Error(`Category ID ${recipe.categoryId} not found for recipe ${recipe.title}`)
    }

    if (!resolvedAuthorId) {
      throw new Error(`Author ID ${recipe.authorId} not found for recipe ${recipe.title}`)
    }

    const docRef = db.collection('recipes').doc(recipe.recipeId)
    await docRef.set({
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      categoryId: resolvedCategoryId,
      authorId: resolvedAuthorId,
      createdAt: new Date(recipe.createdAt),
      rating: recipe.rating,
      isVegetarian: recipe.isVegetarian,
    })
    return docRef
  })

  await Promise.all(recipePromises)
  console.log('Recipes imported successfully.')
}

seed().catch((error) => {
  console.error('Seeding failed:', error)
})
