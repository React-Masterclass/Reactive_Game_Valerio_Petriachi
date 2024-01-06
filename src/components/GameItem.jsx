import React from "react";
import { Link } from 'react-router-dom';
import styles from '../Styles/cards.module.css';

const GameItem = ({ game }) => (

  <div className={styles.card} data-effect="zoom">
    <figure className={styles.card__image}>
      <img src={game.background_image}  />
    </figure>

    <div className={styles.card__body}>
      <h4 className={styles.card__name}>{game.name}</h4>
      <p className={styles.card__job}>{game.genres.map((genre) => genre.name).join(", ")}</p>
      <p className={styles.card__bio}></p>
    </div>
    <div className={styles.card__footer}>
      <p className={styles.card__date}>Rilasciato il {game.released || 'Data non disponibile'}</p>
      <p className={styles.card__selection}><Link to={`/game/${game.id}`}>Seleziona questo gioco</Link></p>
    </div>
  </div>

);

export default GameItem;