import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Cart from '@/pages/Cart.vue'
import Buy from '@/pages/Buy.vue'
import Success from '@/pages/Success.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/cart', component: Cart },
  { path: '/buy', component: Buy },
  { path: '/success', component: Success }
]

const router = createRouter({
  history: createWebHistory(),
  routes // routes: routes 와 동일
})

export default router;