import styles from '../Styles/font.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function AppFooter(){
    return (
        <footer className={styles.rock}>
            <p>@copyright Valerio Petriachi</p>
            <nav aria-label="breadcrumb">               
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About us</Link></li>
                </ul>
            </nav>
        </footer>
    )
}