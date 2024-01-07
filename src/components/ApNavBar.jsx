import { Link, useNavigate } from 'react-router-dom';
import style from '../Styles/pages.module.css';
import font from '../Styles/font.module.css';
import { useContext } from 'react';
import useProfile from '../hooks/useProfile';
import getProfileImg from '../utils/getProfileImg';
import AppContext from '../contexts/AppContext';
import supabase from '../supabase/client';

export default function ApNavBar(){
    const { session } = useContext(AppContext);
    const { profile } = useProfile();
    const navigate = useNavigate();
  
    const handleSignOut = async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    };
    
    return (
        <nav className={style.navBarSticky}>
            <ul>
                <li className={font.rock}><Link to="/">Reactive Games</Link></li>
            </ul>
            {session ? (
        <ul>
          <li className={font.rock}>
            <details role="list" dir="rtl">
              <summary aria-haspopup="listbox" role="link">
                
                Ciao {profile && profile.username}
              </summary>
              <ul role="listbox">
                <li>
                  <Link to="/account">Account page</Link>
                </li>
                <li>
                  <Link to="/settings">Settings page</Link>
                </li>
                <li style={{ cursor: 'pointer' }}>
                  <button type="button" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      ) : (
        <ul>
          <li className={font.rock}><Link to="/login">Login</Link></li>
          <li className={font.rock}><Link to="/register">Register</Link></li>
        </ul>
      )}
        </nav>
    )
}