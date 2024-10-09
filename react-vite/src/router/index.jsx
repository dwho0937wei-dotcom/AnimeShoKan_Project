import { createBrowserRouter } from 'react-router-dom';
import AnimePage from '../components/AnimePage/AnimePage';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import CreateAnimeFormPage from '../components/CreateAnimeFormPage/CreateAnimeFormPage';

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