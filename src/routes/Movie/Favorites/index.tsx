import { useEffect } from 'hooks'
import store from 'store'
import styles from './favorites.module.scss'
import { useRecoilState } from 'recoil'
import { favoritesState } from '../recoil/movie'
import MovieList from '../MovieList'
import Footer from 'components/common/Footer'
import Header from 'components/common/Header'

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
