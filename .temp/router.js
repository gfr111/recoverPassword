import Vue from 'vue'
/*global Vue*/
import Router from 'vue-router'
import login from '@/components/login'
import recoverPass from '@/components/recoverPass'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'recoverPass',
      component: recoverPass
    }
  ]
})
