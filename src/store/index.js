import { configureStore } from '@reduxjs/toolkit';
import allPokemons from './slices/allPokemons/getAllPokemonsSlice.js';

const store = configureStore({
  reducer: {
    allPokemons,
  },
});

export default store;
