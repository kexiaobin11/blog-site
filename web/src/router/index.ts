import { createRouter, createWebHistory } from 'vue-router'
import layout from '../layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: layout,
      children: [
        {
          path: 'tag',
          name: '标签',
          component: () => import('../views/tag/index.vue'),
        },
      ]
    },
  ],
})

export default router
