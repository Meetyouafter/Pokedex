import { configureStore } from '@reduxjs/toolkit';
import pokemons from './slices/somePokemons/getSomePokemonsSlice';
import allPokemons from './slices/allPokemons/getAllPokemonsSlice';
import pokemonData from './slices/pokemonData/getPokemonDataSlice';
import pokemonAbility from './slices/pokemonAbility/getPokemonAbilitySlice';

const store = configureStore({
  reducer: {
    pokemons,
    allPokemons,
    pokemonData,
    pokemonAbility,
  },
});

export default store;
