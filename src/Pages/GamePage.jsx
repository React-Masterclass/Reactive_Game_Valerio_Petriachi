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
    `${import.meta.env.VITE_BASE_URL}games/${params.id}?key=${import.meta.env.VITE_API_KEY}`
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
      alert(error.message);
    } else {
      setFav(data || []);
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
      alert(error.message);
    } else {
      setTimeout(() => {
        getFavGame();
      }, 500);
    }
  };
  
  const removeFromFavorites = async () => {
    console.log('Removing from favorites:', game.id, session.user.id);
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('game_id', game.id)
      .eq('profile_id', session.user.id);
    if (error) {
      alert(error.message);
    } else {
      console.log('Removed successfully');
      setTimeout(() => {
        getFavGame();
      }, 500);
    }
  };

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    const inputForm = event.currentTarget;
    const { message } = Object.fromEntries(new FormData(inputForm));
    if (typeof message === 'string' && message.trim().length !== 0) {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            profile_id: session.user.id,
            game_id: game.id,
            content: message,
          },
        ])
        .select();
      if (error) {
        alert(error.message);
      } else {
        inputForm.reset();
        console.log(data);
      }
    }
  };

  useEffect(() => {
    if (session) {
      getFavGame();
    }
  }, [session, game.id]);


  useEffect(() => {
    if (location.state && location.state.scrollToComments) {
      const commentsDiv = document.getElementById('comments');
      if (commentsDiv) {
        commentsDiv.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);


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
          <div className={`${styles.typewriter} ${styles.scrollLeft}`}>
            <p >Disponibile per: {game.platforms.map((p) => p.platform.name).join(', ')}</p>
          </div>
        </div>

      <div style={{display: 'flex', filter: 'blur(0.7px) drop-shadow(0px 0px 10px white)'}}>

          <img src={game.background_image} style={{width: '50vw', paddingRight: '20px'}} alt="" />
          <div>
            <div>
              <p style={{textShadow: "2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"}}>Rilasciato il {game.released}</p>
              <p style={{textShadow: "2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"}}>Voto medio <b>{game.rating}</b> basato su {game.ratings_count} giudizi</p>
            </div>         
          
              {profile && (
                <div>
                  {fav.length !== 0 ? (
                    <button
                      type="button"
                      style={{textShadow: "2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"}}
                      onClick={removeFromFavorites}
                    >
                      Remove from Favourites
                    </button>
                  ) : (
                    <button
                      type="button"
                      style={{textShadow: "2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"}}
                      onClick={addToFavorites}
                    >
                      Add to Favourites
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
                      style={{textShadow: "2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000"}}
                    >
                      Write a review
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div id="comments">
          <Comments game={game} />
        </div>
        
        {profile && (
          <div style={{display: 'flex'}}>

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
                  
                </button>
              </form>
            </div>

            <Messages game={game} />

          </div>
        )}
      </div>

    </div>
  );
}

export default GamePage;