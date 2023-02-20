import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from './../components/services/MarvelService';
import AppBanner from "../components/appBanner/AppBanner";
import setContent from '../components/utils/setContent';

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { getComic, getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateData()
    }, [id])

    const updateData = () => {
        clearError();

        if (dataType === 'comic') {
            getComic(id)
                .then(onDataLoaded)
                .then(() => setProcess('confirmed'))
        }
        if (dataType === 'character') {
            getCharacter(id)
                .then(onDataLoaded)
                .then(() => setProcess('confirmed'))
        }
    }


    const onDataLoaded = (data) => {
        setData(data);
    }



    return (
        <>
            <AppBanner />
            {setContent(process, Component, data)}
        </>
    )
}

export default SinglePage;