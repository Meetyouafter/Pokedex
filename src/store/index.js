import { configureStore } from '@reduxjs/toolkit';
import allPokemons from './slices/allPokemons/getAllPokemonsSlice';

const store = configureStore({
  reducer: {
    allPokemons,
  },
});

export default store;
