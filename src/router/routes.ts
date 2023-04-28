import Home from '@/views/CreateAccountView.vue'
import SelectCategoryView from '@/views/SelectCategoryView.vue'
import LobbyView from '@/views/LobbyView.vue'
import GameView from '@/views/GameView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { Views } from '@/types'

export const routes = [
  {
    path: '/',
    name: Views.HOME,
    component: Home,
  },
  {
    path: '/select',
    name: Views.SELECT_CATEGORY,
    component: SelectCategoryView,
  },
  {
    path: '/lobby/:id',
    name: Views.LOBBY,
    component: LobbyView,
  },
  {
    path: '/game',
    name: Views.GAME,
    component: GameView,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not found',
    component: NotFoundView,
  },
]