import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";

const Page404 = () => {
    return (
        <div style={{ 'textAlign': 'center' }}>
            <ErrorMessage />
            <h1>Page doesn't exist</h1>
            <h1 ><Link style={{ 'color': '#9F0013', 'textDecoration': 'underline' }} to='/'>Back</Link></h1>
        </div>
    )
}

export default Page404