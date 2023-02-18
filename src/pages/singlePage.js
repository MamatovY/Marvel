import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from './../components/services/MarvelService';
import Spinner from '../components/spinner/Spinner';
import ErrorMessage from './../components/ErrorMessage/ErrorMessage';
import AppBanner from "../components/appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, getComic, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();

        if (dataType === 'comic') {
            getComic(id).then(onDataLoaded);
        }
        if (dataType === 'character') {
            getCharacter(id).then(onDataLoaded);
        }
    }


    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

export default SinglePage;