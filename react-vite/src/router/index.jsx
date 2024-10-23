import { createBrowserRouter } from 'react-router-dom';
import AnimePage from '../components/AnimePage/AnimePage';
import { CreateAnimeFormPage, UpdateAnimeFormPage } from '../components/AnimeFormPage';
import { CreateCharacterFormPage } from '../components/CharacterFormPage'
import EpisodePage from '../components/EpisodePage';
import { CreateEpisodeFormPage, UpdateEpisodeFormPage } from '../components/EpisodeFormPage';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "anime/:animeId",
        element: <AnimePage />
      },
      {
        path: "anime/new",
        element: <CreateAnimeFormPage />
      },
      {
        path: "anime/:animeId/edit",
        element: <UpdateAnimeFormPage />
      },
      {
        path: "anime/:animeId/episode/:episodeId",
        element: <EpisodePage />
      },
      {
        path: "anime/:animeId/episode/new",
        element: <CreateEpisodeFormPage />
      },
      {
        path: "anime/:animeId/episode/:episodeId/edit",
        element: <UpdateEpisodeFormPage />
      },
      {
        path: "character/new",
        element: <CreateCharacterFormPage />
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);