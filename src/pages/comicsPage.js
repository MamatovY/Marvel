import ComicsList from '../components/comicsList/ComicsList'
import SingleComic from '../components/singleComic/SingleComic'
import { Helmet } from 'react-helmet'

const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta name='description' content='Page with list of our comics' />
                <title>Comics list page</title>
            </Helmet>
            <ComicsList />
        </>
    )
}

export default ComicsPage