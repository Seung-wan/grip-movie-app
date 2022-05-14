import { useState } from 'hooks'
import { ISearch } from 'types/movie'

import { useLocation } from 'react-router-dom'

import styles from './item.module.scss'
import SelectModal from './SelectModal'

interface IProps {
  ref?: any
  item: ISearch
  img: string
  title: string
  year: string
  type: string
  isFavorite: boolean
}

const Item = ({ ref, item, img, title, year, type, isFavorite }: IProps) => {
  const [isClicked, setIsClicked] = useState(false)
  const location = useLocation()

  const handleClickMovie = () => {
    setIsClicked((prevState) => !prevState)
  }

  return (
    <li className={styles.itemContainer} ref={ref}>
      {isClicked && <SelectModal item={item} isFavorite={isFavorite} setIsClicked={setIsClicked} />}
      <button className={styles.movieCard} type='button' onClick={handleClickMovie}>
        <img src={img} alt='Movie Poster' />
        <div className={styles.movieDesc}>
          <h3>{title}</h3>
          <p className={styles.movieYear}>{year}</p>
          <p className={styles.movieType}>{type}</p>
        </div>
      </button>
      {isFavorite && location.pathname === '/' && <p className={styles.checkIcon}>즐겨찾기 됨</p>}
    </li>
  )
}

export default Item
