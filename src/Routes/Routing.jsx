import { createBrowserRouter } from 'react-router-dom';
import Root from '../Pages/Root';
import About from '../Pages/About';
import HomeAdmin from '../Pages/HomeAdmin';
import Home from '../Pages/Home';
import { preLoadFilters } from '../Pages/Home';
import GenrePage from '../Pages/GenrePage';
import PlatformPage from '../Pages/PlatformPage';
import GamePage, { getSingleGame } from '../Pages/GamePage';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Settings from '../Pages/Settings';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      loader: preLoadFilters,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: "/admin",
          element: <HomeAdmin />
        },
        {
          path: "/games/:genre",
          element: <GenrePage />
        },
        {
          path: '/settings',
          element: <Settings />,
        },
        {
          path: '/game/:id',
          element: <GamePage />,
          loader: getSingleGame,
        },
        {
          path: '/games/platforms/:platform/:platform_id',
          element: <PlatformPage />,
        },
        {
          path: "/about",
          element: <About />
        }
      ],
    },
    
  ]);