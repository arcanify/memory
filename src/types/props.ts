import { Card, Category, Lobby, StorageKey, User } from '@/types'
import { Ref } from 'vue'

export interface CategoryCard {
  category: Category
}

export interface GameCard {
  card: Card
}

export interface UseApiClient {
  createUser: (user: string) => Promise<void>
  getCategoryCards: (categoryKey: string) => Promise<void>
  getAllCategories: () => Promise<Category[] | null>
}

export interface UseCards {
  cards: Ref<Card[]>
  shuffledCards: Ref<Card[]>
  setCards: (value: Card[]) => void
}

export interface UseCategories {
  categories: Ref<Category[] | null>
  selectedCategory: Ref<Category | null>
  setSelectedCategory: (category: Category) => void
}

export interface UseGame {
  activeCard: Ref<Card | null>
  flipCard: (card: number, action: boolean) => void
  setActiveCard: (card: Card | null) => void
  setActivePlayer: (player: string) => void
}

export interface UseLobby {
  lobby: Ref<Lobby | null>
  isLobbyReady: Ref<boolean>
  listenLobby: (lobbyId: string) => void
  getLobby: (lobbyId: string) => Promise<Lobby | null>
  startLobby: (lobbyId: string, creator: string, category: string, cards: Card[], activeCard: null) => void
  joinLobby: (lobbyId: string, guest: string) => void
  removeLobby: (lobbyId: string) => void
  addPoint: (lobbyId: string, player: string) => void
}

export interface UseLocalStorage {
  setItem: <T>(key: StorageKey, data: T) => void
  getItem: <T>(key: StorageKey) => T | null
}

export interface UseUsers {
  user: Ref<User | null>
  setUser: (username: User) => void;
}

export interface UseGame {
  activeCard: Ref<Card | null>
  flipCard: (card: number, action: boolean) => void
  setActiveCard: (card: Card | null) => void
  setActivePlayer: (player: string) => void
}