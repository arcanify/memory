import { Card } from '@/types'

export interface Score {
  player1: number | null
  player2: number | null
}

export interface Players {
  player1: string | null
  player2: string | null
}

export interface Pair {
  card1: Card
  card2: Card
}