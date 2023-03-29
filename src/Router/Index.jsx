import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Pokedex from '../pages/Pokedex';
import PokemonDetail from '../pages/PokemonDetail';
import PokedexLayout from '../components/PokedexLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import { pokedexLoader } from './Loaders/PokedexLoader';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/pokedex',
    element: (
      <ProtectedRoute>
        <PokedexLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ':id',
        element: <PokemonDetail />,
      },
      {
        path: '',
        element: <Pokedex />,
        loader: pokedexLoader,
      },
    ],
  },
]);
