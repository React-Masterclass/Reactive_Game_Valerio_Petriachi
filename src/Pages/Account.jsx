import { useState, useEffect, useContext } from 'react';
import useProfile from '../hooks/useProfile';
import getProfileImg from '../utils/getProfileImg';
import formatMessageDate from '../utils/formatMessageDate';
import supabase from '../supabase/client';
import style from '../styles/gamePage.module.css';
import AppContext from '../contexts/AppContext';

function Account() {
  const { session } = useContext(AppContext);
  const { profile, loading } = useProfile();
  const [comments, setComments] = useState([]);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const getComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*, profile: profiles(username)')
        .eq('profile_id', session.user.id);
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      } else {
        setComments(data);
      }
    };
    getComments();
  }, []);

  useEffect(() => {
    const getFav = async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('profile_id', session.user.id);
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.message);
      } else {
        setFavorites(data);
      }
    };
    getFav();
  }, []);

  return (
    <div className="container">
      {loading && <progress />}
      <img
        src={profile && getProfileImg(profile.avatar_url)}
        alt="profile"
        width={200}
      />
      <h1>
        Benvenuto
        {profile && (profile.usename || session.user.user_metadata.full_name)}
      </h1>
      <div>
        <details>
          <summary>Le tue Reviews</summary>
          {comments.map((c) => (
            <div key={c.id}>
              <div className={style.comment_container}>
                <article>
                  <p className={style.comment_title}>{c.comment_title}</p>
                  <p>{c.comment_content}</p>
                  <div className={style.comment_details}>
                    <p className={style.detail}>
                      Published by: {c.profile.username}
                    </p>
                    <p className={style.detail}>
                      {formatMessageDate(c.created_at)}
                    </p>
                  </div>
                </article>
              </div>
            </div>
          ))}
        </details>

        <details>
          <summary>I tuoi Preferiti</summary>
          <ul>
            {favorites &&
              favorites.map((favGame) => (
                <li key={favGame.id}>{favGame.game_name}</li>
              ))}
          </ul>
        </details>
      </div>
    </div>
  );
}

export default Account;
