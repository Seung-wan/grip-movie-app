import styles from './Item.module.scss'

interface IProps {
  img: string
  title: string
  year: string
  type: string
}

const Item = ({ img, title, year, type }: IProps) => {
  return (
    <article className={styles.movieCard}>
      <img src={img} alt='Movie Poster' />
      <div className={styles.movieDesc}>
        <h3>{title}</h3>
        <p className={styles.movieYear}>{year}</p>
        <p className={styles.movieType}>{type}</p>
      </div>
    </article>
  )
}

export default Item
