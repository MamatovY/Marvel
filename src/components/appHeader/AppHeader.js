import './appHeader.scss';
import { Link, NavLink } from 'react-router-dom';

const AppHeader = () => {
    const activeStyle = { 'color': '#9F0013', 'textDecoration': 'underline' }
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to='/'>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink style={({ isActive }) => isActive ? activeStyle : undefined} to='/'>Characters</NavLink></li>
                    /
                    <li><NavLink to="/comics" style={({ isActive }) => isActive ? activeStyle : undefined}>Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;