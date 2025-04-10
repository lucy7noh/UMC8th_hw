import { JSX } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';

//BrowserRouter v5
//createBrowserRouter v6

const router = createBrowserRouter([
  {
    //부모요소
    path: '/',
    element: <HomePage/>,
    errorElement: <NotFoundPage/>,

    children: [
      {
      path: 'movies/:category',
      element: <MoviePage />,
    },

    {
      path: 'movie/:movieId',
      element: <MovieDetailPage />,
    },
  ],
  },
])



function App(): JSX.Element {
  return <RouterProvider router={router} />;
}

export default App;
