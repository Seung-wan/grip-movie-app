import { useEffect } from 'hooks'
import { useRecoilState } from 'recoil'
import store from 'store'

import MovieList from '../MovieList'
import Footer from 'routes/Movie/_common/Footer'
import Header from 'routes/Movie/_common/Header'
import { favoritesState } from '../recoil/movie'
import styles from './favorites.module.scss'

const Favorites = () => {
  const [favoritesList, setFavoritesList] = useRecoilState(favoritesState)

  useEffect(() => {
    const data = store.get('favorites')

    if (data) {
      setFavoritesList(data.reverse())
    }
  }, [setFavoritesList])

  return (
    <div className={styles.container}>
      <Header />
      <MovieList movieList={favoritesList} />
      <Footer />
    </div>
  )
}

export default Favorites
