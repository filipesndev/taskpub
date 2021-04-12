import Header from './layout/Header'
import Main from './layout/Main'
import Footer from './layout/Footer'
import Sidebar from './layout/Sidebar'
import css from './App.module.css'
import StoreProvider from '../store/StoreProvider'


function App(props)  {
  return (
    <StoreProvider>
      <div className={css.app}>
        <Sidebar/>
        <div className={css.content}>
          <Header/>
          <Main/>
          <Footer/>
        </div>
      </div>
    </StoreProvider>
  )
}

export default App