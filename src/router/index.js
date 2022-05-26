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
  },
  {
    path: '/product/list',
    name: 'ProductList',
    component: () => import(/* webpackChunkName: "ProductList" */ '../views/product/List.vue')
  },
  {
    path: '/product/detail/:type/:id',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "ProductDetail" */ '../views/product/Detail.vue')
  },
  {
    path: '/success',
    name: 'PaySuccess',
    component: () => import(/* webpackChunkName: "PaySuccess" */ '../views/success/index.vue')
  },
  {
    path: '/profile/index',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "Profile" */ '../views/profile/Profile.vue')
  },
  {
    path: '/profile/detail',
    name: 'ProfileDetail',
    component: () => import(/* webpackChunkName: "ProfileDetail" */ '../views/profile/Detail.vue')
  },
  {
    path: '/profile/folder',
    name: 'ProfileFolder',
    component: () => import(/* webpackChunkName: "ProfileFolder" */ '../views/profile/Folder.vue')
  },
  {
    path: '/bike/scan',
    name: 'BikeScan',
    component: () => import(/* webpackChunkName: "BikeScan" */ '../views/bike/Scan.vue')
  },
  {
    path: '/bike/plans/:carId',
    name: 'BikePlans',
    component: () => import(/* webpackChunkName: "BikePlans" */ '../views/bike/Plans.vue')
  },
  {
    path: '/bike/rentSuccess',
    name: 'BikeRentSuccess',
    component: () => import(/* webpackChunkName: "BikeRentSuccess" */ '../views/bike/RentSuccess.vue')
  },
  {
    path: '/bike/backSuccess',
    name: 'BikeBackSuccess',
    component: () => import(/* webpackChunkName: "BikeBackSuccess" */ '../views/bike/BackSuccess.vue')
  },
  {
    path: '/bike/status',
    name: 'BikeStatus',
    component: () => import(/* webpackChunkName: "BikeStatus" */ '../views/bike/Status.vue')
  },
  {
    path: '/bike/back/:orderId/:code',
    name: 'BikeBack',
    component: () => import(/* webpackChunkName: "BikeBack" */ '../views/bike/Back.vue')
  }
]

const router = new VueRouter({ routes, mode: 'history' })

export default router
