import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import GameItem from "../components/GameItem";
import styles from '../Styles/font.module.css';

export default function GenrePage() {
  const { genre } = useParams();
  const [Genregames, setGenregames] = useState([]);
  const [pagination, setPagination] = useState(1);

  const handlePaginationChange = (event, value) => {
    setPagination(value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&genres=${genre}&page=${pagination}&page_size=20`
        );

        if (!response.ok) {
          console.error("Error fetching data:", response.statusText);
          return;
        }

        const json = await response.json();
        setGenregames(json.results);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [genre, pagination]);

  return (
    <div style={{ width: "100%" }}>
      <div>
        <div className={styles.buzz_wrapper}>
          <div className={styles.text}>
            <span >{genre} games</span>
          </div>
        </div>

      <div className={styles.typeContainer}>
        <div className={styles.typewriter}>
          <p >Scegli tra i giochi di tipo {genre}</p>
        </div>
      </div>

        <Stack spacing={2}>
          <Pagination
            count={10}  // Update with the actual total number of pages
            variant="outlined"
            page={pagination}
            onChange={handlePaginationChange}
          />
        </Stack>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '30px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {Genregames && Genregames.map((game) => <GameItem key={game.id} game={game} />)}
      </div>
    </div>
  );
}
