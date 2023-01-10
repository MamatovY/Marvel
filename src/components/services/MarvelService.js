import { useHttp } from "../../hooks/http.hook"
const useMarvelService = () => {
    const { loading, error, request, clearError } = useHttp()

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=4cace9b18a1b5bb25b7375a644d4aa80'
    const _baseOffset = 210

    const getAllCharacters = async (offset = _baseOffset) => {
        console.log('GetAllCharacters');
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getAllComics = async (offset = _baseOffset) => {
        console.log('getAllComics')
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
    }
    const getCharacter = async (id) => {
        const res = await request(
            `${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0])
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (char) => {
        return {
            id: char.id,
            title: char.title,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            price: char.prices[0].price,
            homepage: char.urls[0].url,
        }
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
    return { loading, error, getAllCharacters, getCharacter, getAllComics, clearError, getComics }
}

export default useMarvelService; 