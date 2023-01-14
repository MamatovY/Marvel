import './singleComicPage.scss';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useMarvelService from '../components/services/MarvelService';
import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

const SingleComicPage = () => {
    const [comic, setComic] = useState({})
    const { comicId } = useParams()
    const { getComic, loading, error, clearError } = useMarvelService()

    useEffect(() => {
        updateComic()
    }, [comicId])

    const updateComic = () => {
        clearError()
        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({ comic }) => {
    const { title, description, thumbnail, price, pageCount, language } = comic
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>

            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;