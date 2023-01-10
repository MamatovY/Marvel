
import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../services/MarvelService';
import { useEffect, useState } from 'react';

const SingleComic = () => {
    const [comics, setComics] = useState({})
    const { getComics } = useMarvelService()

    useEffect(() => {
        let id = 103452
        getComics(id)
            .then(setComics)
    }, [])

    return (
        <div className="single-comic">
            <img src={comics.thumbnail} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{comics.title}</h2>
                <p className="single-comic__descr">Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?</p>
                <p className="single-comic__descr">144 pages</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{comics.price}$</div>
            </div>
            <a href="#" className="single-comic__back">Back to all</a>
        </div>
    )
}

export default SingleComic;