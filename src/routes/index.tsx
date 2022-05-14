import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import Movie from './Movie'
import Favorites from './Movie/Favorites'
import styles from './routes.module.scss'

const App = () => {
  return (
    <div className={styles.app}>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Movie />} />
            <Route path='favorites' element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

export default App
