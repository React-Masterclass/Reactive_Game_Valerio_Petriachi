import { useLoaderData, Link } from 'react-router-dom';
import styles from '../Styles/font.module.css';
import { useContext, useEffect, useState } from 'react';
import supabase from '../supabase/client';
import useProfile from '../hooks/useProfile';
import Messages from '../components/Messages';
import Comments from '../components/Comments';
import AppContext from '../contexts/AppContext';


export async function getSingleGame({ params }) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}games/${params.id}?key=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const json = await response.json();
  return json;
}

function GamePage() {
  const { session } = useContext(AppContext);
  const { profile } = useProfile();
  const game = useLoaderData();
  const [fav, setFav] = useState([]);

  const getFavGame = async () => {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('game_id', game.id)
      .eq('profile_id', session.user.id);
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      setFav(() => [...data]);
    }
  };

  const addToFavorites = async () => {
    const { error } = await supabase
      .from('favorites')
      .insert([
        {
          game_id: game.id,
          game_name: game.name,
        },
      ])
      .select();
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      getFavGame();
    }
  };

  const removeFromFavorites = async () => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('game_id', game.id)
      .eq('profile_id', session.user.id);
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      getFavGame();
    }
  };

  return (
    <div>
      <div >
        <div >

        <div className={styles.buzz_wrapper}>
          <div className={styles.text}>
            <span >{game.name}</span>
          </div>
        </div>

        <div className={styles.typeContainer}>
          <div className={styles.typewriter}>
            <p >Disponibile per: {game.platforms.map((p) => p.platform.name).join(', ')}</p>
          </div>
        </div>

          <img src={game.background_image} width={300} alt="" />
          
          {profile && (
            <div>
              {fav.length !== 0 ? (
                <button
                  type="button"
                  
                  onClick={removeFromFavorites}
                >
                  Remove from Favorites
                </button>
              ) : (
                <button
                  type="button"
                  
                  onClick={addToFavorites}
                >
                  Add to Favorites
                </button>
              )}
              <Link
                to={`/game/${game.id}/comment`}
                style={{
                  textDecoration: 'none',
                }}
              >
                <button
                  type="button"
                  
                >
                  Write a review
                </button>
              </Link>
            </div>
          )}
        </div>
        {profile && (
          <div >
            <Messages game={game} />
            <div >
              <p
                style={{
                  margin: '10px 0',
                  padding: '0',
                }}
              >
                Chat message with gamers
              </p>
              <form
                
                onSubmit={handleMessageSubmit}
              >
                <input
                  
                  type="text"
                  name="message"
                  placeholder="type your message..."
                />
                <button
                  type="submit"
                  className={` contrast`}
                >
                  Send
                  <RiMailSendLine
                    style={{
                      marginLeft: '5px',
                    }}
                  />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <Comments game={game} />
    </div>
  );
}

export default GamePage;