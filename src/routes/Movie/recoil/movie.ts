import { atom } from 'recoil'
import { Search } from 'types/movie'

export const favoritesState = atom<Search[]>({
  key: 'favoritesState',
  default: [],
})
