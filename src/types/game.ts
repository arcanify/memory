import { Card, User } from '@/types'

export interface Score {
  player1: number | null
  player2: number | null
}

export interface GameUsers {
  user: User | null
  opponent: User | null
}

export interface Pair {
  card1: Card
  card2: Card
}