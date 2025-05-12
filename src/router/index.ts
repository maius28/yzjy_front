import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Overview',
    component: () => import('@/views/Overview.vue'),
    meta: {
      title: '总览'
    }
  },
  {
    path: '/monitoring',
    name: 'Monitoring',
    component: () => import('@/views/Monitoring.vue'),
    meta: {
      title: '人员监控'
    }
  },
  {
    path: '/detection/:id',
    name: 'Detection',
    component: () => import('@/views/Detection.vue'),
    meta: {
      title: '检测'
    }
  },
  {
    path: '/record',
    name: 'Record',
    component: () => import('@/views/Record.vue'),
    meta: {
      title: '检测记录'
    }
  },
  {
    path: '/dialogue',
    name: 'Dialogue',
    component: () => import('@/views/dialogue/index.vue'),
    meta: {
      title: '语音对话'
    }
  },
  {
    path: '/tracking',
    name: 'Tracking',
    component: () => import('@/views/Tracking.vue'),
    meta: {
      title: '历史记录',
      icon: 'history-outlined',
      hidden: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 