import { ChangeEvent, FormEvent } from 'react'
import styles from './header.module.scss'
import { SearchIcon } from '../../assets/svgs'
import { Link, useLocation } from 'react-router-dom'

interface Props {
  searchText?: string
  handleChangeSearchText?: (evt: ChangeEvent<HTMLInputElement>) => void
  handleSubmitForm?: (evt: FormEvent<HTMLFormElement>) => void
}

const Header = ({ searchText, handleChangeSearchText, handleSubmitForm }: Props) => {
  const location = useLocation()

  return (
    <header>
      <Link to='/'>
        <h1>Movie Searching App</h1>
      </Link>
      {location.pathname === '/' && (
        <form className={styles.searchForm} onSubmit={handleSubmitForm}>
          <input type='text' placeholder='Search' value={searchText} onChange={handleChangeSearchText} />
          <button type='submit'>
            <SearchIcon className={styles.icon} />
          </button>
        </form>
      )}
    </header>
  )
}

export default Header
