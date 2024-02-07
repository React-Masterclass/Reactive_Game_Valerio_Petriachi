import React, { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import GameItem from "../components/GameItem";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Genres from "../components/Genres";
import Publisher from "../components/Publisher";
import Platform from "../components/Platform"
import styles from '../Styles/font.module.css';
import style from '../Styles/cards.module.css';
import useDebouceSearch from '../hooks/useDebouceSearch';

export async function getGenres() {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}genres?key=${import.meta.env.VITE_API_KEY}`
  );
  const json = await response.json();
  return json.results;
}

export async function getPlatforms() {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}platforms?key=${import.meta.env.VITE_API_KEY}`
  );
  const json = await response.json();
  console.log('Piattaforme API:', json);
  return json.results;
}

export async function getPublishers() {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}publishers?key=${import.meta.env.VITE_API_KEY}`
  );
  const json = await response.json();
  console.log('Produttori API:', json);
  return json.results;
}

export async function preLoadFilters() {
  const genres = await getGenres();
  const platforms = await getPlatforms();
  const publishers = await getPublishers();

  return {
    genres,
    platforms,
    publishers,
  };
}



export default function Home() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatformgames] = useState([]);
  const [publishers, setPublisherGames] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouceSearch(search);
  const [state, setState] = useState({
    filtra: false,
  });

  const handleSearch = (event) => {
    setSearch(event.currentTarget.value);
  };

  const handlePaginationChange = (event, value) => {
    setPagination(value);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Genres genres={genres} />
      </List>
      <Divider />
      <List>
        <Platform platforms={platforms}/>
      </List>
      <Divider />
      <List>
        <Publisher publishers={publishers}/>
      </List>
    </Box>
  );

  async function getAPI() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&page=${pagination}&page_size=20&search=${search}`);
      const json = await response.json();
      
      if (response.ok) {
        setGames(json.results);
      } else {
        setError('Riprova');
      }
    } catch (error) {
      setError('Riprova con un\'altra URL', error.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    setGames([]);
    setError('');
    setLoading(true);

    const fetchData = async () => {
      try {
        const genresData = await getGenres();
        const platformGame = await getPlatforms();
        const publisherGame = await getPublishers();
        setGenres(genresData);
        setPlatformgames(platformGame);
        setPublisherGames(publisherGame);
        const timeOutApi = setTimeout(() => {
          getAPI();
        }, 1500);

        return () => {
          clearTimeout(timeOutApi);
        };
      } catch (error) {
        setError('Riprova con un\'altra URL', error.message);
        setLoading(false);
      }
    };

    fetchData();

  }, [ pagination, debouncedSearch]);

  return (
    <div style={{ width: '100%' }}>
      <div>
      <div className={styles.buzz_wrapper}>
        <div className={styles.text}>
          <span >Nuovi e di tendenza</span>
        </div>
      </div>

      <div className={styles.typeContainer}>
        <div className={styles.typewriter}>
          <p >Dati basati dagli utenti e dalla data di pubblicazione</p>
        </div>
      </div>

        <TextField id="outlined-basic" label="Cerca il tuo gioco..." variant="outlined" onChange={handleSearch} style={{width: '100%', filter: 'drop-shadow(0 -1mm 1mm white) blur (0.5px)'}}/>
        <div style={{ filter: 'drop-shadow(white 0px 0mm 4mm) blur(0.9px)', textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',  letterSpacing: '3px' }}>
          {['left'].map((anchor) => {
            return (
              <React.Fragment key={anchor}>
                <Button onClick={toggleDrawer(anchor, true)} className={style.buttonGlitch} style={{textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', letterSpacing: '2px'}}>SCEGLI I TUOI FILTRI</Button>
                <SwipeableDrawer
                  anchor={anchor}
                  open={state[anchor]}
                  onClose={toggleDrawer(anchor, false)}
                  onOpen={toggleDrawer(anchor, true)}
                >
                  {list(anchor)}
                </SwipeableDrawer>
              </React.Fragment>
            );
          })}
        
          <Stack spacing={2} style={{alignItems: 'center', textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
            <Pagination
              count={20}
              variant="outlined"
              page={pagination}
              onChange={handlePaginationChange}
            />
          </Stack>
        </div>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <progress />}

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {games && games.map((game) => <GameItem key={game.id} game={game} />)}
      </div>
    </div>
  );
}
