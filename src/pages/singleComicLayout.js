import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './singlePage.scss'

const SingleComicLayout = ({ data }) => {
    const { title, description, pageCount, thumbnail, language, price } = data;

    return (
        <div className="single-page">
            <Helmet>
                <meta name='description' content={`${title} comics book`} />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-page__img" />
            <div className="single-page__info">
                <h2 className="single-page__name">{title}</h2>
                <p className="single-page__descr">{description}</p>
                <p className="single-page__descr">{pageCount}</p>
                <p className="single-page__descr">{language}</p>
                <div className="single-page__price">{price}</div>
            </div>

            <Link to='/comics' className="single-page__back">Back to all</Link>
        </div>
    )
}

export default SingleComicLayout;
