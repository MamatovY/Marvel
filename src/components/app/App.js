import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './app.scss'


import AppHeader from '../appHeader/AppHeader';
import { ComicsPage, Main, Page404, SinglePage, SingleComicLayout, SingleCharLayout } from '../../pages';

const App = () => {
    return (
        <Router>
            <div className='app'>
                <AppHeader />
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/comics' element={<ComicsPage />} />
                    <Route exact path="/comics/:id" element={<SinglePage Component={SingleComicLayout} dataType='comic' />} />
                    <Route exact path="/characters/:id" element={<SinglePage Component={SingleCharLayout} dataType='character' />} />
                    <Route path='*' element={<Page404 />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App;
