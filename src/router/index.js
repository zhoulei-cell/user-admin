import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from 'views/Login'
import Home from 'views/Home'
import NotFound from 'views/NotFound'
import { checkToken } from 'network/api/auth'
import { CODE_SUCCESS } from 'utils/code'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/user/list',
        name: 'UserList',
        component: () => import('views/Home/User/UserList')
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const token = sessionStorage.getItem('admin_token')
  if (token) {
    checkToken().then(res => {
      const data = res.data
      if (data.code === CODE_SUCCESS) {
        if (data.isValid) {
          next()
        } else {
          next('/login')
        }
      } else {
        next('/login')
      }
    })
  } else {
    next('/login')
  }
})

export default router
