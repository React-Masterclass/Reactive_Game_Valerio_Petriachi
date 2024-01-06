import { Link, useNavigate } from 'react-router-dom';
import style from '../Styles/pages.module.css';
import font from '../Styles/font.module.css';

export default function ApNavBar(){
    return (
        <nav className={style.navBarSticky}>
            <ul>
                <li className={font.rock}><Link to="/">Reactive Games</Link></li>
            </ul>
            <ul>
                <li className={font.rock}><Link to="/login">Login</Link></li>
                <li className={font.rock}><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    )
}