import ErrorMessage from "../ErrorMessage/ErrorMessage"
import Skeleton from "../skeleton/Skeleton"
import Spinner from "../spinner/Spinner"



const setContent = (process, Content, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton />
        case 'loading':
            return <Spinner />
        case 'confirmed':
            return <Content data={data} />
        case 'error':
            return <ErrorMessage />
        default:
            throw new Error('Unexpected process state')
    }
}

export default setContent 