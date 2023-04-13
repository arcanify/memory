export enum Collections {
  CATEGORY = 'category',
  USER = 'user',
}

export interface User {
  username: string
}

export interface Category {
  image: string
  name: string
}

export interface Card {
  categoryKey: string
  pairingKey: string
  image: string
}