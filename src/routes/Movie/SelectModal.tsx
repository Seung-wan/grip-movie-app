import store from 'store'
import { useRecoilState } from 'recoil'
import { favoritesState } from './Favorites/recoil/movie'
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
  // const ref = useRef() as React.MutableRefObject<HTMLDivElement>

  const handleClickAddFavorites = (movie: Search) => {
    // setFavoritesList((prevState) => [...prevState, movie])

    store.set('favorites', [...favoritesList, movie])
    setFavoritesList((prevState) => [...prevState, movie])
    // data ? store.set('favorites', [...data, movie]) : store.set('favorites', [...data, movie])

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

  // useEffect(() => {
  //   document.body.addEventListener('click', (evt: React.BaseSyntheticEvent | MouseEvent) => {
  //     if (ref.current !== null) {
  //       if (ref.current.contains(evt.currentTarget)) {
  //         return 0
  //       }
  //     }

  //     setIsClicked(false)
  //     return 1
  //   })
  // })

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
