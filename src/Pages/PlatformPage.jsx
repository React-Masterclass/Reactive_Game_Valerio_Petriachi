import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PaginationOutlined from "../components/Pagination";
import Stack from '@mui/material/Stack';
import GameItem from "../components/GameItem";
import styles from '../Styles/font.module.css';
import Pagination from '@mui/material/Pagination';

export default function PlatformPage() {
  const { platform, platform_id } = useParams();
  const [platformGames, setPlatformGames] = useState([]);
  const [pagination, setPagination] = useState(1);

  const handlePaginationChange = (event, value) => {
    setPagination(value);
  };

  useEffect(() => {

    async function getPlatform() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}games?key=${
            import.meta.env.VITE_API_KEY
          }&page=${pagination}&platforms=${platform_id}`
        );

        console.log(response);

        if (response.ok) {
          const json = await response.json();
          setPlatformGames(json.results);

          console.log(json);
        } else {
          setError('Ops, riprova la tua chiamata API');
        }

        setLoading(false);
      } catch (error) {
        setError('Ops, pagina non trovata', error.message);
      }
    }
    getPlatform();
  }, [platform, pagination]);


  return (
    <div style={{ width: "100%" }}>
      <div>
      <div className={styles.buzz_wrapper}>
          <div className={styles.text}>
            <span >{platform} games</span>
          </div>
        </div>

      <div className={styles.typeContainer}>
        <div className={styles.typewriter}>
          <p>Hai una {platform} ? Scegli tra questi giochi</p>
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
        {platformGames && platformGames.map((game) => <GameItem key={game.id} game={game} />)}
      </div>
    </div>
  );
}
