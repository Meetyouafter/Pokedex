import { configureStore } from "@reduxjs/toolkit";
import pokemons from './slices/pokemon/getPokemonsSlice';

const store = configureStore({
  reducer: {
    pokemons,
  }
});

export default store;
