import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styles from '../Styles/cards.module.css';
import supabase from '../supabase/client';
import AppContext from '../contexts/AppContext';

const GameItem = ({ game, onToggleFavorite }) => {
  const { session } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const getFavoriteStatus = async () => {
      if (session) {
        const { data, error } = await supabase
          .from('favorites')
          .select('*')
          .eq('game_id', game.id)
          .eq('profile_id', session.user.id);
        
        if (error) {
          console.error(error.message);
        } else {
          setIsFavorite(data.length !== 0);
        }
      }
    };

    getFavoriteStatus();
  }, [session, game.id]);

  const handleToggleFavorite = async () => {
    if (isFavorite) {
      // Remove from favorites
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('game_id', game.id)
        .eq('profile_id', session.user.id);
      
      if (error) {
        console.error(error.message);
      } else {
        setIsFavorite(false);
      }
    } else {
      // Add to favorites
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
        console.error(error.message);
      } else {
        setIsFavorite(true);
      }
    }
  };

  return (
    <div className={styles.card} data-effect="zoom">
      <figure className={styles.card__image}>
        <img src={game.background_image} alt={game.name} />
      </figure>
      <p className={styles.card__selection}>
        <Link to={`/game/${game.id}`}>Seleziona questo gioco</Link>
      </p>
      {session && (
          <Link to="#" onClick={handleToggleFavorite}>
          {isFavorite ? (
            <img
              src="https://www.creativefabrica.com/wp-content/uploads/2022/03/01/Neon-Light-Luxury-Heart-Graphics-26195678-2-580x387.png"
              alt="Remove from Favorites"
              className={styles.heart_favorite}
            />
          ) : (
            <img
              src="https://img1.picmix.com/output/stamp/normal/9/7/5/4/2394579_39da1.png"
              alt="Add to Favorites"
              className={styles.heart_favorite}
            />
          )}
        </Link>
        )}

      <div className={styles.card__body}>
        <h4 className={styles.card__name}>
          <Link to={`/game/${game.id}`}>{game.name}</Link>
        </h4>
        <p className={styles.card__genre}>
          {game.genres.map((genre) => genre.name).join(", ")}
        </p>
      </div>
      <div className={styles.card__footer}>
        <p className={styles.card__rate}>
          Voto medio <b>{game.rating}</b> basato su {game.ratings_count} giudizi
        </p>
        <p className={styles.card__date}>
          Rilasciato il {game.released || 'Data non disponibile'}
        </p>

        
      </div>
    </div>
  );
};

export default GameItem;
