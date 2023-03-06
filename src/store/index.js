import { configureStore } from "@reduxjs/toolkit";
import pokemons from './slices/pokemons/getPokemonsSlice';
import pokemonData from './slices/pokemonData/getPokemonDataSlice';
import pokemonAbility from './slices/pokemonAbility/getPokemonAbilitySlice';

const store = configureStore({
  reducer: {
    pokemons,
    pokemonData,
    pokemonAbility,
  }
});

export default store;
