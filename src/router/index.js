import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/attraction/list',
    name: 'AttractionList',
    component: () => import(/* webpackChunkName: "AttractionList" */ '../views/attraction/List.vue')
  },
  {
    path: '/attraction/detail/:id',
    name: 'AttractionDetail',
    component: () => import(/* webpackChunkName: "AttractionDetail" */ '../views/attraction/Detail.vue')
  }
]

const router = new VueRouter({ routes })

export default router
