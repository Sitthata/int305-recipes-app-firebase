import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        { path: '/:userId', name: 'user', component: () => import('../views/UserRecipes.vue') }
      ]
    },
    {
      path: '/recipes',
      name: 'recipes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/recipes/RecipeView.vue'),
      children: [
        {
          path: '/recipes/:queryId',
          name: 'user-recipes',
          component: () => import('../views/recipes/RecipeView.vue'),
        },
      ]
    },
  ],
})

export default router
