import { Link } from 'react-router-dom';
import './singlePage.scss'

const SingleCharLayout = ({ data }) => {
    const { name, description, thumbnail } = data;

    return (
        <div className="single-page">
            <img src={thumbnail} alt={name} className="single-page__img" />
            <div className="single-page__info">
                <h2 className="single-page__name">{name}</h2>
                <p className="single-page__descr">{description}</p>
            </div>

            <Link to='/' className="single-page__back">Back to all</Link>
        </div>
    )
}

export default SingleCharLayout;