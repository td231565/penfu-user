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
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/product',
    redirect: '/product/list',
    name: 'Product',
    children: [
      {
        path: 'list',
        name: 'ProductList',
        component: () => import('../views/product/List.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
