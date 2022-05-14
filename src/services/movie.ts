import { axios } from 'hooks/worker'
import { IMovieAPIRes, ISearch } from 'types/movie.d'

const MOVIE_BASE_URL = 'https://www.omdbapi.com'
const API_KEY = process.env.REACT_APP_MOVIE_API_KEY

export const getMovieApi = async (s: string, page: number) => {
  const data = await axios
    .get<IMovieAPIRes>(MOVIE_BASE_URL, {
      params: {
        apikey: API_KEY,
        s,
        page,
      },
    })
    .then((res) => {
      const response = res.data.Response === 'True'
      const search = res.data.Search?.reduce((acc: ISearch[], cur: ISearch) => {
        // 영화 리스트에 중복이 있으면 무시
        if (acc.findIndex((el) => el.imdbID === cur.imdbID) === -1) acc.push(cur)

        return acc
      }, [])
      const error = String(res.data.Error) ?? ''
      const totalResults = res.data.totalResults ?? 0
      return { response, search, error, totalResults }
    })

  return { ...data }
}
