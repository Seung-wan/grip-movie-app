import { useEffect } from 'hooks'
import store from 'store'
import Item from '../Item'
import { useRecoilState } from 'recoil'
import { useLocation } from 'react-router-dom'
import styles from './Favorites.module.scss'
import { favoritesState } from '../recoil/movie'
import { Search } from 'types/movie'
import Footer from 'components/Footer'

const Favorites = () => {
  const [favoritesList, setFavoritesList] = useRecoilState(favoritesState)
  const location = useLocation()

  useEffect(() => {
    const data = store.get('favorites')

    if (data) {
      setFavoritesList(data.reverse())
    }
  }, [setFavoritesList])

  return (
    <div className={styles.container}>
      <h1>Movie Searching App</h1>

      {/* 컴포넌트 분리 예정 */}
      <h2>내 즐겨찾기</h2>
      {!favoritesList?.length && <div className={styles.emptyMessage}>검색 결과가 없습니다.</div>}
      <main className={styles.favoritesList}>
        <ul>
          {favoritesList &&
            favoritesList.map((item: Search, idx: number) => {
              const key = `${item.imdbID}-${idx}`
              let isFavorite = false
              if (favoritesList.find((favorite) => favorite.imdbID === item.imdbID)) isFavorite = true
              return (
                <Item
                  item={item}
                  key={key}
                  img={item.Poster}
                  title={item.Title}
                  year={item.Year}
                  type={item.Type}
                  isFavorite={isFavorite}
                  usedPage={location.pathname}
                />
              )
            })}
        </ul>
      </main>

      <Footer />
    </div>
  )
}

export default Favorites
