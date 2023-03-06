import { configureStore } from '@reduxjs/toolkit';
import pokemons from './slices/somePokemons/getSomePokemonsSlice';
import allPokemons from './slices/allPokemons/getAllPokemonsSlice';
import pokemonData from './slices/pokemonData/getPokemonDataSlice';

const store = configureStore({
  reducer: {
    pokemons,
    allPokemons,
    pokemonData,
  },
});

export default store;
