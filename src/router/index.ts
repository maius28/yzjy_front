import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Overview',
    component: () => import('@/views/Overview.vue')
  },
  {
    path: '/monitoring',
    name: 'Monitoring',
    component: () => import('@/views/Monitoring.vue')
  },
  {
    path: '/monitoring/detection/:id',
    name: 'Detection',
    component: () => import('@/views/Detection.vue')
  },{
    path: '/dialog',
    name: 'Dialog',
    component: () => import('@/views/dialogue/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 