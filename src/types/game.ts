import { Card, User } from './firebase'

export interface Score {
  scoreUser: number | null
  scoreOpponent: number | null
}

export interface GameUsers {
  user: User | null
  opponent: User | null
}

export interface Pair {
  card1: Card
  card2: Card
}