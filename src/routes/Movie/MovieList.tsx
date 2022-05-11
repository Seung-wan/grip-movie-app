import { useRef, useEffect } from 'hooks'
import { useLocation } from 'react-router-dom'
import Item from './Item'
import styles from './movieList.module.scss'
import { useRecoilValue } from 'recoil'
import { favoritesState } from './recoil/movie'
import { Search } from 'types/movie'
import { TailSpin } from 'react-loader-spinner'

interface Props {
  movieList: Search[]
  loader?: React.MutableRefObject<null>
  fixedText?: string
  isLoading?: boolean
}

const MovieList = ({ movieList, loader, fixedText, isLoading }: Props) => {
  const favoritesList = useRecoilValue(favoritesState)
  const location = useLocation()
  const movieListTopRef = useRef<null | HTMLDivElement>(null)
  const scrollToBottom = () => {
    if (movieListTopRef.current !== null) {
      movieListTopRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [fixedText])
  return (
    <main>
      {location.pathname === '/favorites' ? <h2>내 즐겨찾기</h2> : <h2>Movie List</h2>}

      {!movieList && <div className={styles.emptyMessage}>검색 결과가 없습니다.</div>}

      <ul className={styles.movieList}>
        <div ref={movieListTopRef} />
        {movieList?.map((item, idx) => {
          const key = `${item.imdbID}-${idx}`
          return (
            <Item
              key={key}
              item={item}
              img={item.Poster}
              title={item.Title}
              year={item.Year}
              type={item.Type}
              isFavorite={!!favoritesList.find((favorite) => favorite.imdbID === item.imdbID)}
              usedPage={location.pathname}
            />
          )
        })}
        {isLoading && <TailSpin />}

        {movieList && <div ref={loader} />}
      </ul>
    </main>
  )
}

export default MovieList
