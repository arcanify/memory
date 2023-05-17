import { Score, Players } from '@/types'

export enum Collections {
  CATEGORY = 'category',
  CARD = 'card'
}

export interface User {
  username: string
}

export interface Category {
  image: string
  name: string
  key: string
}

export interface Card {
  id: string;
  categoryKey: string
  pairingKey: string
  frontImage: string
  backImage: string
  isFlipped: boolean
}

export interface Lobby {
  ID: string
  category: string
  players: Players
  score: Score
  cards: Card[]
  activeCard: Card
  turn: string
}