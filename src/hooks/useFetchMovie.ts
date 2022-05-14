import { useEffect, useState } from 'hooks'
import { useRecoilState } from 'recoil'

import { movieListState } from '../routes/Movie/recoil/movie'
import { getMovieApi } from 'services/movie'

export const useFetchMovie = (query: string, pageNumber: number) => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const [movieList, setMovieList] = useRecoilState(movieListState)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    if (query.length === 0) return
    setMovieList([])
  }, [query, setMovieList])

  useEffect(() => {
    const fetchData = async () => {
      const { response, search, totalResults, error } = await getMovieApi(query, pageNumber)
      setLoading(false)

      if (!response) {
        setErrorMessage(error)
        return
      }
      setErrorMessage(undefined)
      setMovieList((prev) => [...prev, ...search])
      setHasMore(pageNumber * 10 < Number(totalResults))
    }

    if (query.length > 0) {
      setLoading(true)
      setErrorMessage(undefined)
      fetchData()
    }
  }, [query, pageNumber, setMovieList])
  return { movieList, hasMore, loading, errorMessage }
}
