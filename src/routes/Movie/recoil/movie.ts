import { atom } from 'recoil'
import { ISearch } from 'types/movie'

export const movieListState = atom<ISearch[]>({
  key: '#movieListState',
  default: [],
})

export const favoritesState = atom<ISearch[]>({
  key: '#favoritesState',
  default: [],
})
