import { useState } from 'react'
import { Helmet } from 'react-helmet'
import decoration from '../resources/img/vision.png';

import CharInfo from '../components/charInfo/CharInfo'
import CharList from '../components/charList/CharList'
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary'
import RandomChar from '../components/randomChar/RandomChar'
import CharSearch from '../components/charSearch';

const Main = () => {
    const [selectedChar, setSelectedChar] = useState(null)
    const [selectedComics, setSelectedComics] = useState(null)

    const onCharSelected = (id) => {
        setSelectedChar(id)
    }
    const onComicsSelected = (id) => {
        setSelectedChar(id)
    }
    return (
        <>

            <Helmet>
                <meta name="description" content="Marvel information portal" />
                <title>Marvel information portal</title>
            </Helmet>
            <main>
                <RandomChar />
                <div className='char__content'>
                    <CharList
                        charId={selectedChar}
                        onCharSelected={onCharSelected} />
                    <div>
                        <ErrorBoundary>
                            <CharInfo charId={selectedChar} />
                        </ErrorBoundary>
                        <CharSearch />
                    </div>
                </div>
                <img className='bg-decoration' src={decoration} alt='vision' />
            </main>
        </>
    )
}

export default Main