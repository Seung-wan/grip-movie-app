import { atom } from 'recoil'
import { Search } from 'types/movie'

export const movieListState = atom<Search[]>({
  key: '#movieListState',
  default: [],
})

export const favoritesState = atom<Search[]>({
  key: '#favoritesState',
  default: [],
})
