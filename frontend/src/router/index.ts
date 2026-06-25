import { createRouter, createWebHistory } from 'vue-router'
import about from '@/views/about.vue'
import home from '@/views/home.vue'
import game from '@/views/game.vue'
import addgame from '@/views/addgame.vue'
import infogame from '@/components/infogame.vue'
import editgame from '@/components/editgame.vue'
import isError from '@/components/isError.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component: about 
    },
    {
      path: '/',
      name: 'home',
      component: home 
    },
    {
      path: '/game',
      name: 'game',
      component: game 
    },
    {
      path: '/addgame',
      name: 'addgame',
      component: addgame 
    },
    {
      path: '/game/:id',
      name: 'infogame',
      component: infogame 
    },
    {
      path: '/editgame/:id',
      name: 'editgame',
      component: editgame 
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: isError
    }
  ],
})

export default router