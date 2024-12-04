import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';
import users from './data/users.json';
import recipes from './data/recipes.json';
import categories from './data/category.json';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

async function seed() {
    const userPromises = users.map(user => {
        return db.collection('users').add({
            name: user.name,
            email: user.email,
            favorites: user.favorites,
            createdAt: new Date(user.createdAt),
            isPremium: user.isPremium
        });
    });
    await Promise.all(userPromises);
    console.log('Users imported successfully.');

    const recipePromises = recipes.map(recipe => {
        return db.collection('recipes').add({
            title: recipe.title,
            description: recipe.description,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            categoryId: recipe.categoryId,
            authorId: recipe.authorId,
            createdAt: new Date(recipe.createdAt),
            rating: recipe.rating,
            isVegetarian: recipe.isVegetarian
        });
    });
    await Promise.all(recipePromises);
    console.log('Recipes imported successfully.');

    const categoryPromises = categories.map(category => {
        return db.collection('categories').add({
            name: category.name,
            description: category.description,
            createdAt: new Date(category.createdAt)
        });
    });
    await Promise.all(categoryPromises);
    console.log('Categories imported successfully.');
}

seed().catch(console.error);