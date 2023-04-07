import { User } from './user'

export interface Score {
  scoreUser: number | null
  scoreOpponent: number | null
}

export interface GameUsers {
  user: User | null
  opponent: User | null
}