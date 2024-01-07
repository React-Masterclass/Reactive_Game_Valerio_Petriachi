import { createBrowserRouter } from 'react-router-dom';
import Root from '../Pages/Root';
import About from '../Pages/About';
import HomeAdmin from '../Pages/HomeAdmin';
import Home from '../Pages/Home';
import { preLoadFilters } from '../Pages/Home';
import ProtectedRoute from '../components/ProtectedRoute';
import GenrePage from '../Pages/GenrePage';
import PublisherPage from '../Pages/PublisherPage';
import PlatformPage from '../Pages/PlatformPage';
import GamePage, { getSingleGame } from '../Pages/GamePage';
import Login from '../Pages/Login';
import CommentPage from '../pages/CommentPage';
import Register from '../Pages/Register';
import Settings from '../Pages/Settings';
import Account from '../Pages/Account';

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
          path: '/games/publishers/:publisher',
          element: <PublisherPage />
        },
        {
          path: '/',
          element: <ProtectedRoute />,
          children: [
            {
              path: '/account',
              element: <Account />,
            },
            {
              path: '/settings',
              element: <Settings />,
            },
          ],
        },
        {
          path: '/game/:id',
          element: <GamePage />,
          loader: getSingleGame,
        },
        {
          path: '/game/:id/comment',
          element: <CommentPage />,
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