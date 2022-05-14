import { ChangeEvent, FormEvent } from 'react'
import { useState, useEffect, useRef, useCallback } from 'hooks'
import { useSetRecoilState } from 'recoil'
import store from 'store'

import { useFetchMovie } from 'hooks/useFetchMovie'
import { favoritesState } from './recoil/movie'

import Header from 'routes/Movie/_common/Header'
import Footer from 'routes/Movie/_common/Footer'
import MovieList from './MovieList'
import styles from './movie.module.scss'

const Movie = () => {
  const setFavoritesList = useSetRecoilState(favoritesState)

  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [fixedText, setFixedText] = useState('')
  const { movieList, hasMore, loading, errorMessage } = useFetchMovie(fixedText, page)

  const scrollRef = useRef<HTMLLIElement>(null)

  const handleChangeSearchText = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.currentTarget.value)
  }

  const handleSubmitForm = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    setPage(1)
    setFixedText(searchText)
    setSearchText('')
  }

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (loading) return

      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1)
      }
    },
    [hasMore, loading]
  )

  useEffect(() => {
    let observer: IntersectionObserver

    if (scrollRef.current) {
      observer = new IntersectionObserver(handleObserver, { threshold: 0.5 })
      observer.observe(scrollRef.current)
    }
    return () => observer && observer.disconnect()
  }, [scrollRef, handleObserver])

  useEffect(() => {
    const data = store.get('favorites')

    if (data) {
      setFavoritesList(data)
    }
  }, [setFavoritesList])

  return (
    <div className={styles.container}>
      <Header
        searchText={searchText}
        handleChangeSearchText={handleChangeSearchText}
        handleSubmitForm={handleSubmitForm}
      />
      <MovieList
        movieList={movieList}
        scrollRef={scrollRef}
        fixedText={fixedText}
        loading={loading}
        errorMessage={errorMessage}
      />
      <Footer />
    </div>
  )
}

export default Movie
