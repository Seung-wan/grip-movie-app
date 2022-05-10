import store from 'store'
import { useRecoilState } from 'recoil'
import { favoritesState } from './recoil/movie'
import { Search } from 'types/movie'
import styles from './SelectModal.module.scss'

interface Props {
  item: Search
  usedPage: string
  setIsClicked: (bool: boolean) => void
  isFavorite: boolean
}

const SelectModal = ({ item, usedPage, isFavorite, setIsClicked }: Props) => {
  const [favoritesList, setFavoritesList] = useRecoilState<Search[] | []>(favoritesState)

  const handleClickAddFavorites = (movie: Search) => {
    store.set('favorites', [...favoritesList, movie])
    setFavoritesList((prevState) => [...prevState, movie])

    setIsClicked(false)
  }

  const handleClickDeleteFavorites = (movie: Search) => {
    const filteredData = favoritesList.filter((favorite) => {
      return favorite.imdbID !== movie.imdbID
    })
    store.set('favorites', filteredData)
    setFavoritesList(filteredData)
    setIsClicked(false)
  }

  const handleClickCloseButton = () => {
    setIsClicked(false)
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.buttonWrapper}>
        {isFavorite ? (
          <button type='button' onClick={() => handleClickDeleteFavorites(item)}>
            즐겨찾기 제거
          </button>
        ) : (
          <button type='button' onClick={() => handleClickAddFavorites(item)}>
            즐겨찾기
          </button>
        )}

        <button type='button' onClick={handleClickCloseButton}>
          취소
        </button>
      </div>
    </div>
  )
}

export default SelectModal
