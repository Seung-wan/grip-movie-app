import { useLocation } from 'react-router-dom'
import { useRef, useEffect } from 'hooks'
import { useRecoilValue } from 'recoil'

import Item from './Item'
import { TailSpinner } from './Spinner'
import { favoritesState } from './recoil/movie'
import { ISearch } from 'types/movie'
import styles from './movieList.module.scss'

interface Props {
  movieList: ISearch[]
  scrollRef?: React.MutableRefObject<HTMLLIElement | null>
  fixedText?: string
  loading?: boolean
  errorMessage?: string | undefined
}

const MovieList = ({ movieList, fixedText, loading, scrollRef, errorMessage }: Props) => {
  const favoritesList = useRecoilValue(favoritesState)
  const location = useLocation()
  const movieListTopRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (movieListTopRef.current !== null) {
      movieListTopRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  useEffect(() => {
    scrollToBottom()
  }, [fixedText])

  if (errorMessage) return <div className={styles.errorMessage}>검색 결과가 없습니다.</div>

  return (
    <main>
      {location.pathname === '/favorites' ? <h2>내 즐겨찾기</h2> : <h2>Movie List</h2>}

      {!loading && movieList.length === 0 && <div className={styles.emptyMessage}>검색 결과가 없습니다.</div>}

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
            />
          )
        })}
        <li ref={scrollRef}>{loading && <TailSpinner />}</li>
      </ul>
    </main>
  )
}

export default MovieList
