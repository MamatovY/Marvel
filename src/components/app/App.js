import React, { useState } from "react";
import './app.scss'

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";

const App = () => {
    const [selectedChar, setSelectedChar] = useState(null)
    const [selectedComics, setSelectedComics] = useState(null)

    const onCharSelected = (id) => {
        setSelectedChar(id)
    }
    const onComicsSelected = (id) => {
        setSelectedChar(id)
    }

    return (
        <div className="app">
            <AppHeader />
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
            {/* <ComicsList /> */}
            {/* <SingleComic /> */}
        </div>
    )

}

export default App;