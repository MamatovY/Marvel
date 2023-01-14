import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './app.scss'


import AppHeader from '../appHeader/AppHeader';
import { ComicsPage, Main, Page404, SingleComicPage } from '../../pages';

const App = () => {
    return (
        <Router>
            <div className='app'>
                <AppHeader />
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/comics' element={<ComicsPage />} />
                    <Route path='/comics/:comicId' element={<SingleComicPage />} />
                    <Route path='*' element={<Page404 />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;