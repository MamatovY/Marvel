import { useState, useEffect } from 'react';
import './comicsList.scss';

import useMarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([])
    const [offset, setOffset] = useState(210)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [comicsEnded, setComicsEnded] = useState(false)

    const { loading, error, getAllComics } = useMarvelService()


    useEffect(() => {
        if (comicsList.length === 0) {
            onRequest(offset, true)
        }
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComics)
    }

    const onComics = (newComicsList) => {
        let ended = false
        if (newComicsList.length < 8) {
            ended = true
        }

        setComicsList([...comicsList, ...newComicsList])
        setOffset(offset + 8)
        setNewItemLoading(false)
        setComicsEnded(ended)
    }

    function renderItems() {
        const items = comicsList.map((item, i) => {
            return (
                <li key={i} className="comics__item">
                    <a href={item.homepage}>
                        <img src={item.thumbnail} alt="x-men" className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price ? item.price : 'NOT AVAILABLE'}</div>
                    </a>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems()

    const ErrorMessage = error ? <ErrorMessage /> : null
    const spinner = loading && !newItemLoading ? <Spinner /> : null

    return (
        <div className="comics__list">

            {ErrorMessage}
            {spinner}
            {items}

            <button onClick={onRequest}
                disabled={newItemLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;