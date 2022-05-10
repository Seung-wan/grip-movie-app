import styles from './Routes.module.scss'
import Movie from './Movie'
import Favorites from './Movie/Favorites'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className={styles.app}>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Movie />} />
            <Route path='/favorites' element={<Favorites />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  )
}

export default App
