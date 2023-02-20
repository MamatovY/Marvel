import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import useMarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';


const setContent = (process, Content, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />
        case 'loading':
            return newItemLoading ? <Content /> : <Spinner />
        case 'confirmed':
            return <Content />
        case 'error':
            return <ErrorMessage />
        default:
            throw new Error('Unexpected process state')
    }
}

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([])
    const [offset, setOffset] = useState(210)
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [comicsEnded, setComicsEnded] = useState(false)
    const { getAllComics, process, setProcess } = useMarvelService()


    useEffect(() => {
        if (comicsList.length === 0) {
            onRequest(offset, true)
        }
        //eslint-disable-next-line
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComics)
            .then(() => setProcess('confirmed'))
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
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="x-men" className="comics__item-img" />
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price ? item.price : 'NOT AVAILABLE'}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(), newItemLoading)}

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