import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import './charInfo.scss';
import useMarvelService from '../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {
    const [char, setChar] = useState(null)

    const { loading, error, getCharacter, clearError } = useMarvelService()

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const updateChar = () => {
        const { charId } = props
        if (!charId) {
            return
        }

        clearError()

        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    const skeleton = char || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !char) ? <View char={char} /> : null
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}

            {content}
        </div>
    )

}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char

    let imgStyle = null;
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { 'objectFit': 'contain' };
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="char__descr">
                {description ? description : 'There is no description for this character'}
            </div>

            <div className="char__comics">Comics:</div>

            <ul className="char__comics-list">

                {
                    comics.length > 0 ? null : 'There is no comics with this character'
                }

                {comics.map((item, i) => {
                    if (i > 9) return null
                    return (
                        <Link to={`/comics/${item.id}`} key={i} className="char__comics-item">
                            {i + 1}. {item.title}
                        </Link>
                    )
                })}
            </ul>
        </>
    )
}



export default CharInfo;