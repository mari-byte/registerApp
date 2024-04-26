import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import type { RouteRecordRaw } from 'vue-router'

const routeSettings: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/member/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/sidebar',
    name: 'sidebar',
    // component: () => import('../views/LoginView.vue')
    component: () => import('../views/Sidebar.vue')
  },
  // {
  //   path: '/Input',
  //   name: 'Input',
  //   component: () => import('../views/Input.vue')
  // },
  // {
  //   path:'/validate',
  //   name: 'validate',
  //   component: () => import('../views/Fieldsss.vue')
  // },
  {
    path: '/practice',
    name: 'Practice',
    component: () => import('../views/Practice.vue')
  },
  {
    path: '/study',
    name: 'Study',
    component: () => import('../views/Study.vue')
  },
  {
    path: '/inputstudy',
    name: 'InputStudy',
    component: () => import('../views/InputStudy.vue')
  },
  // {
  //   path: '/timepicker',
  //   name: 'Timepicker',
  //   component: () => import('../views/TimepickerStudy.vue')
  // },
  {
    path: '/table',
    name: 'Table',
    component: () => import('../views/TableStudy.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List.vue')
  },
  {
    path: '/app/test',
    name: 'RegisterApp',
    component: () => import('../views/RegisterApp.vue')
  },
  {
    path: '/app/test/register',
    name: 'Register',
    component: () => import('../views/PercentCorRegister.vue')
  },
  {
    path: '/app/test/list',
    name: 'ListApp',
    component: () => import('../views/PercentCorList.vue')
  },
  // {
  //   path: '/app/test/update:idValues',
  //   name: 'ListUpdate',
  //   component: () => import('../views/PercentCorUpdate.vue'),
  //   // props: true
  //   // props: (route) => ({
  //   //   idValues: route.params.idValues
  //   // })
  // }
  {
    path: '/app/test/update',
    name: 'ListUpdate',
    component: () => import('../views/PercentCorUpdate.vue'),
    props: true
  }
    
]

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: routeSetting
// })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeSettings
})

export default router
