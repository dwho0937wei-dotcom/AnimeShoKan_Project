import { createBrowserRouter, Navigate } from 'react-router-dom';
import AnimePage from '../components/AnimePage/AnimePage';
import { CreateAnimeFormPage, UpdateAnimeFormPage } from '../components/AnimeFormPage';
import { CreateCharacterFormPage, UpdateCharacterFormPage } from '../components/CharacterFormPage'
import CharacterPage from '../components/CharacterPage';
import EpisodePage from '../components/EpisodePage';
import { CreateEpisodeFormPage, UpdateEpisodeFormPage } from '../components/EpisodeFormPage';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import AnimeCatalogPage from '../components/AnimeCatalogPage';
import CharacterCatalogPage from '../components/CharacterCatalogPage';
import { UserProfilePage, UserProfileAnime, UserProfileCharacters } from '../components/UserProfilePage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/anime" replace />,
      },
      {
        path: "/anime",
        element: <AnimeCatalogPage />
      },
      {
        path: "/anime/:animeId",
        element: <AnimePage />
      },
      {
        path: "/anime/new",
        element: <CreateAnimeFormPage />
      },
      {
        path: "/anime/:animeId/edit",
        element: <UpdateAnimeFormPage />
      },
      {
        path: "/anime/:animeId/episode/:episodeId",
        element: <EpisodePage />
      },
      {
        path: "/anime/:animeId/episode/new",
        element: <CreateEpisodeFormPage />
      },
      {
        path: "/anime/:animeId/episode/:episodeId/edit",
        element: <UpdateEpisodeFormPage />
      },
      {
        path: "/character",
        element: <CharacterCatalogPage />
      },
      {
        path: "/character/:characterId",
        element: <CharacterPage />
      },
      {
        path: "/character/:characterId/edit",
        element: <UpdateCharacterFormPage />
      },
      {
        path: "/character/new",
        element: <CreateCharacterFormPage />
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
      {
        path: "/user/:userId",
        element: <UserProfilePage />,
        children: [
          {
            path: "posted-anime",
            element: <UserProfileAnime />
          },
          {
            path: "posted-characters",
            element: <UserProfileCharacters />
          }
        ]
      }
    ],
  },
]);