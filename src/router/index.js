import Vue from 'vue'
import VueRouter from 'vue-router'
import homeView from '../views/homeView.vue'
import editform from '../components/Editform.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: homeView
  },
  {
    path: '/form',
    name: 'form',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/form.vue')
  },
  {
    path: '/editform/:id?',
    name: 'EditForm',
    component: editform
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
