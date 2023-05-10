import { Card } from '@/types'

export interface Score {
  player1: number | null
  player2: number | null
}

export interface Pair {
  card1: Card
  card2: Card
}