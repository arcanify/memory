import Home from '@/components/CreateAccountView.vue'
import SelectGame from '@/components/SelectGameView.vue'
import Lobby from '@/components/LobbyView.vue'
import Game from '@/components/GameView.vue'
import NotFound from '@/components/NotFoundView.vue'
import { Views } from '@/types'

export const routes = [
  {
    path: '/',
    name: Views.HOME,
    component: Home,
    // props: true,
  },
  {
    path: '/select',
    name: Views.SELECT_GAME,
    component: SelectGame,
    // props: true,
  },
  {
    path: '/lobby',
    name: Views.LOBBY,
    component: Lobby,
    // props: true,
  },
  {
    path: '/game',
    name: Views.GAME,
    component: Game,
    // props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not found',
    component: NotFound,
  },
]