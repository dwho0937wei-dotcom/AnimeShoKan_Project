import { createBrowserRouter } from 'react-router-dom';
import AnimePage from '../components/AnimePage/AnimePage';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import { CreateAnimeFormPage, UpdateAnimeFormPage } from '../components/AnimeFormPage';

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