import { useMount, useState } from 'hooks'

import Item from './Item'

import { SearchIcon } from 'assets/svgs'
import styles from './Movie.module.scss'

import { IMovieAPIRes } from 'types/movie'
import { getMovieApi } from 'services/movie'

const Movie = () => {
  const [data, setData] = useState<IMovieAPIRes>()
  const [page, setPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  console.log(process.env.REACT_APP_MOVIE_API_KEY)
  // apikey: string
  // s: string
  // page: number
  useMount(() => {
    getMovieApi({
      apikey: String(process.env.REACT_APP_MOVIE_API_KEY),
      s: 'Iron Man',
      page: 1,
    })
  })

  return (
    <div className={styles.container}>
      <h1>Movie Searching App</h1>
      <form className={styles.searchForm} onSubmit={() => {}}>
        <input type='text' placeholder='Search' />
        <button type='submit'>
          <SearchIcon className={styles.icon} />
        </button>
      </form>

      <main className={styles.movieList}>
        <h2>Movie List</h2>
        <Item
          img='https://m.media-amazon.com/images/M/MV5BZWNjZTJjZmYtYjhjZS00ZjgwLWFjY2UtMzBlMDkzZmM3M2FiXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg'
          title='Iron Man'
          year='1981'
          type='Movie'
        />

        <Item
          img='https://m.media-amazon.com/images/M/MV5BZWNjZTJjZmYtYjhjZS00ZjgwLWFjY2UtMzBlMDkzZmM3M2FiXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg'
          title='Iron Man'
          year='1981'
          type='Movie'
        />
        <Item
          img='https://m.media-amazon.com/images/M/MV5BZWNjZTJjZmYtYjhjZS00ZjgwLWFjY2UtMzBlMDkzZmM3M2FiXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg'
          title='Iron Man'
          year='1981'
          type='Movie'
        />
        <Item
          img='https://m.media-amazon.com/images/M/MV5BZWNjZTJjZmYtYjhjZS00ZjgwLWFjY2UtMzBlMDkzZmM3M2FiXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg'
          title='Iron Man'
          year='1981'
          type='Movie'
        />
      </main>

      <footer>
        <ul>
          <li>
            <button type='button'>검색</button>
          </li>

          <li>
            <button type='button'>즐겨찾기</button>
          </li>
        </ul>
      </footer>
    </div>
  )
}

export default Movie
