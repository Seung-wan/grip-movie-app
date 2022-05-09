import { useState } from 'hooks'
import { Search } from 'types/movie'

// import { CheckIcon, StarIcon } from 'assets/svgs'

import styles from './Item.module.scss'
import SelectModal from './SelectModal'

interface IProps {
  ref?: any
  item: Search
  img: string
  title: string
  year: string
  type: string
  isFavorite: boolean
  usedPage: string
}

const Item = ({ ref, item, img, title, year, type, isFavorite, usedPage }: IProps) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClickMovie = () => {
    setIsClicked((prevState) => !prevState)
  }

  return (
    <li className={styles.itemContainer} ref={ref}>
      <button className={styles.movieCard} type='button' onClick={handleClickMovie}>
        <img src={img} alt='Movie Poster' />
        <div className={styles.movieDesc}>
          <h3>{title}</h3>
          <p className={styles.movieYear}>{year}</p>
          <p className={styles.movieType}>{type}</p>
        </div>
      </button>
      {isFavorite && usedPage === '/' && <p className={styles.checkIcon}>즐겨찾기 됨</p>}
      {isClicked && <SelectModal item={item} usedPage={usedPage} isFavorite={isFavorite} setIsClicked={setIsClicked} />}
    </li>
  )
}

export default Item
