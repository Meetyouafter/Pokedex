import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from '../store/index';
import Pokedex from './pokedex/Pokedex';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemons" element={<Pokedex />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;
