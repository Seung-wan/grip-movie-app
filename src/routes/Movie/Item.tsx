import { useLocation } from 'react-router-dom'
import { useState } from 'hooks'

import SelectModal from './SelectModal'
import { ISearch } from 'types/movie'
import styles from './item.module.scss'

interface IProps {
  ref?: any
  item: ISearch
  isFavorite: boolean
}

const Item = ({ ref, item, isFavorite }: IProps) => {
  const [isClicked, setIsClicked] = useState(false)
  const location = useLocation()

  const handleClickMovie = () => {
    setIsClicked((prevState) => !prevState)
  }

  return (
    <li className={styles.itemContainer} ref={ref}>
      {isClicked && <SelectModal item={item} isFavorite={isFavorite} setIsClicked={setIsClicked} />}
      <button className={styles.movieCard} type='button' onClick={handleClickMovie}>
        <img src={item.Poster} alt='Movie Poster' />
        <div className={styles.movieDesc}>
          <h3>{item.Title}</h3>
          <p className={styles.movieYear}>{item.Year}</p>
          <p className={styles.movieType}>{item.Type}</p>
        </div>
      </button>
      {isFavorite && location.pathname === '/' && <p className={styles.checkIcon}>즐겨찾기 됨</p>}
    </li>
  )
}

export default Item
