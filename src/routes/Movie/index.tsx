import { useEffect, useState, useRef, useCallback } from 'hooks'
import store from 'store'
import { useRecoilState } from 'recoil'
import { useLocation } from 'react-router-dom'
import Item from './Item'

import { SearchIcon } from 'assets/svgs'
import styles from './Movie.module.scss'

import { Search } from 'types/movie'
import { favoritesState } from './Favorites/recoil/movie'
import { getMovieApi } from 'services/movie'
import Footer from 'components/Footer'

const Movie = () => {
  const [favoritesList, setFavoritesList] = useRecoilState(favoritesState)
  const [movieList, setMovieList] = useState<Search[]>([])
  const [maxLength, setMaxLength] = useState<string>()
  const [page, setPage] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [fixedText, setFixedText] = useState('')
  const loader = useRef(null)
  const location = useLocation()

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0]
    if (target.isIntersecting) {
      setPage((prev) => prev + 1)
    }
  }, [])

  // scroll 다루는 useEffect
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    }

    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) observer.observe(loader.current)
  }, [handleObserver])

  const handleChangeSearchText = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.currentTarget.value)
  }

  const handleSubmitForm = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setPage(1)
    console.log('page', page)

    try {
      const data = await getMovieApi({
        apikey: String(process.env.REACT_APP_MOVIE_API_KEY),
        s: searchText,
        page: 1,
      })

      setMaxLength(data.data.totalResults)
      setMovieList(data.data.Search)
    } catch (e) {
      console.error(e)
    }
    setFixedText(searchText)
    setSearchText('')
  }

  useEffect(() => {
    const data = store.get('favorites')

    if (data) {
      setFavoritesList([...data])
    }
  }, [setFavoritesList])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieApi({
          apikey: String(process.env.REACT_APP_MOVIE_API_KEY),
          s: fixedText,
          page,
        })

        // if (page === 1) setMovieList(data.data.Search)
        setMovieList((prevState) => [...prevState, ...data.data.Search])
      } catch (e) {
        console.error(e)
      }
      setSearchText('')
    }

    if (page > 1 && page <= Number(maxLength) / 10) {
      fetchData()
    }
  }, [page, maxLength])

  return (
    <div className={styles.container}>
      <h1>Movie Searching App</h1>
      <form className={styles.searchForm} onSubmit={handleSubmitForm}>
        <input type='text' placeholder='Search' value={searchText} onChange={handleChangeSearchText} />
        <button type='submit'>
          <SearchIcon className={styles.icon} />
        </button>
      </form>

      <h2>Movie List</h2>
      {!movieList?.length && <div className={styles.emptyMessage}>검색 결과가 없습니다.</div>}
      <main className={styles.movieList}>
        <ul>
          {movieList &&
            movieList?.map((item, idx) => {
              const key = `${item.imdbID}-${idx}`
              let isFavorite = false

              if (favoritesList.find((favorite) => favorite.imdbID === item.imdbID)) isFavorite = true
              return (
                <Item
                  key={key}
                  item={item}
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
        {movieList && <div ref={loader} />}
      </main>
      <Footer />
    </div>
  )
}

export default Movie
