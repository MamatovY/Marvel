import { useState, useEffect, useRef } from 'react';
import './charList.scss';

import PropTypes from 'prop-types';
import useMarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';



const CharList = (props) => {
    const [charList, setCharList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const { loading, error, getAllCharacters } = useMarvelService()

    useEffect(() => {
        if (charList.length === 0) {
            onRequest(offset, true)
        }
    }, [])


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)

        getAllCharacters(offset)
            .then(onCharLoaded)
    }



    const onCharLoaded = (newCharList) => {
        let ended = false
        if (newCharList.length < 9) {
            ended = true
        }

        setCharList([...charList, ...newCharList])
        setNewItemLoading(false)
        setOffset(offset + 9)
        setCharEnded(ended)
    }

    console.log('CharList!');

    const itemRefs = useRef([])



    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'))
        itemRefs.current[id].classList.add('char__item_selected')
        itemRefs.current[id].focus()
    }

    function View(charList) {
        const items = charList.map((item, i) => {
            // const charListClass = item.id === props.charId ? 'char__item selected' : 'char__item'
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            return (
                <li
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    className='char__item'
                    onClick={() => {
                        focusOnItem(i)
                        props.onCharSelected(item.id)
                    }
                    }
                >
                    <img src={item.thumbnail} alt="abyss" style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li >
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading && !newItemLoading ? <Spinner /> : null

    const gridStyle = loading ? { 'display': 'block' } : null
    return (
        <div className="char__list" >
            <ul className="char__grid" style={gridStyle}>
                {errorMessage}
                {spinner}
                {View(charList)}
            </ul>
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ 'display': charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;