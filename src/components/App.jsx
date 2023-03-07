import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from '../store/index';
import Loader from './loader/Loader';
import Pokedex from './pokedex/Pokedex';
import PokedexPagination from './pokedexPagination/pokedexPagination';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokedexPagination />} />
        <Route path="/pokemons" element={<Pokedex />} />
        <Route path="/loader" element={<Loader />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
