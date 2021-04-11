import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home/Home.vue'
import País from '@/views/País/País.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:regiao?',
    name: 'Home',
    component: Home,
    meta: { title: 'Mova' }
  },
  {
    path: '/pais/:pais',
    name: 'País',
    component: País,
    meta: { title: 'País'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
