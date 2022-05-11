import { ChangeEvent, FormEvent } from 'react'
import { useSetRecoilState, useRecoilState } from 'recoil'
import store from 'store'
import { useEffect, useState, useRef } from 'hooks'
import Footer from 'components/common/Footer'
import styles from './Movie.module.scss'
import { Search } from 'types/movie'
import { getMovieApi } from 'services/movie'
import { movieListState, favoritesState } from './recoil/movie'
import MovieList from './MovieList'
import Header from 'components/common/Header'

const Movie = () => {
  const setFavoritesList = useSetRecoilState(favoritesState)
  const [movieList, setMovieList] = useRecoilState<Search[]>(movieListState)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [maxLength, setMaxLength] = useState('')
  const [page, setPage] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [fixedText, setFixedText] = useState('')

  const loader = useRef(null)

  const handleChangeSearchText = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.currentTarget.value)
  }

  const handleSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    try {
      setIsLoading(true)
      const data = await getMovieApi({
        apikey: String(process.env.REACT_APP_MOVIE_API_KEY),
        s: searchText,
        page: 1,
      })

      setMaxLength(data.data.totalResults)
      setMovieList(data.data.Search)
      setIsLoading(false)
    } catch (e) {
      setError(true)
    }
    setFixedText(searchText)
    setSearchText('')
  }

  useEffect(() => {
    const data = store.get('favorites')

    if (data) {
      setFavoritesList(data)
    }
  }, [setFavoritesList])

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0]
    if (target.isIntersecting) {
      setPage((prev) => prev + 1)
    }
  }

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver(handleObserver, option)
    if (loader.current) observer.observe(loader.current)
  }, [])

  useEffect(() => {
    setPage(0)
  }, [fixedText])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const data = await getMovieApi({
          apikey: String(process.env.REACT_APP_MOVIE_API_KEY),
          s: fixedText,
          page,
        })

        setMovieList((prevState) => [...prevState, ...data.data.Search])
        setIsLoading(false)
      } catch (e) {
        setError(true)
      }
      setSearchText('')
    }

    if (page > 1 && page <= Number(maxLength) / 10) {
      fetchData()
    }
  }, [page])

  if (error) return <div>Error</div>

  return (
    <div className={styles.container}>
      <Header
        searchText={searchText}
        handleChangeSearchText={handleChangeSearchText}
        handleSubmitForm={handleSubmitForm}
      />
      <MovieList movieList={movieList} loader={loader} fixedText={fixedText} isLoading={isLoading} />
      <Footer />
    </div>
  )
}

export default Movie
