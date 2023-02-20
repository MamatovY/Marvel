import { useHttp } from "../../hooks/http.hook"
const useMarvelService = () => {
    const { process, setProcess, request, clearError, } = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=4cace9b18a1b5bb25b7375a644d4aa80'
    const _baseOffset = 210

    const getCharacterFind = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)

        return res.data.results.map(_transformCharacter)
    }

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(
            `${_apiBase}characters/${id}?${_apiKey}`);
        const comics = await request(
            `${_apiBase}characters/${id}/comics?${_apiKey}`);
        return _transformCharacter(res.data.results[0], comics.data.results)
    }


    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);

        return res.data.results.map(_transformComics)
    }





    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);

        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
            homepage: comics.urls[0].url,
            pageCount: comics.pageCount ? `${comics.pageCount} pages` : 'No information about the number of pages',
            description: comics.description || 'There is no description for this comic',
            language: comics.textObjects.language || 'en-us'
        }
    }

    const _transformCharacter = (char, comics) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics
        }
    }
    return {
        process,
        setProcess,
        getAllCharacters,
        getCharacter,
        getAllComics,
        clearError,
        getComic,
        getCharacterFind,
    }
}

export default useMarvelService; 