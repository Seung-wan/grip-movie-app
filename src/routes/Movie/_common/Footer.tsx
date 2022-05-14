import { Link } from 'react-router-dom'

import styles from './footer.module.scss'

const Footer = () => {
  return (
    <footer>
      <nav>
        <ul className={styles.linkContainer}>
          <Link to='/'>
            <li>
              <button className={styles.linkButton} type='button'>
                검색
              </button>
            </li>
          </Link>

          <Link to='/favorites'>
            <li>
              <button className={styles.linkButton} type='button'>
                즐겨찾기
              </button>
            </li>
          </Link>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer
