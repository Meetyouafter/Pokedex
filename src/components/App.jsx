import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from '../store/index';
import AllPokemons from './allPokemons/allPokemons';
import PokedexPagination from './pokedexPagination/pokedexPagination';
import Pokedex from './pokedex/Pokedex';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokedexPagination />} />
        <Route path="/pokemons" element={<AllPokemons />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
