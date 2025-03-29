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
          path: '',
          name: '首页',
          component: () => import('../views/dashboard/index.vue')
        },
        {
          path: 'tag',
          name: '标签',
          component: () => import('../views/tag/index.vue'),
        },
        {
          path: 'category',
          name: '分类',
          component: () => import('../views/category/index.vue'),
        },
      ]
    },
  ],
})

export default router
