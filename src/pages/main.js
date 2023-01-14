import { useState } from "react"
import decoration from '../resources/img/vision.png';

import CharInfo from "../components/charInfo/CharInfo"
import CharList from "../components/charList/CharList"
import ErrorBoundary from "../components/errorBoundary/ErrorBoundary"
import RandomChar from "../components/randomChar/RandomChar"

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
        <main>
            <RandomChar />
            <div className="char__content">
                <CharList
                    charId={selectedChar}
                    onCharSelected={onCharSelected} />
                <ErrorBoundary>
                    <CharInfo charId={selectedChar} />
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
    )
}

export default Main