import { createSlice } from '@reduxjs/toolkit';
import getPokemonAbility from './getPokemonAbility';

const initialState = {
  pokemonAbility: null,
  isLoading: true,
  error: null,
};

const getPokemonAbilitySlice = createSlice({
  name: 'pokemonAbility',
  initialState,
  extraReducers: {
    [getPokemonAbility.pending]: (state) => {
      state.pokemonAbility = null;
      state.isLoading = true;
      state.error = null;
    },
    [getPokemonAbility.fulfilled]: (state, action) => {
      state.pokemonAbility = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [getPokemonAbility.rejected]: (state, action) => {
      state.pokemonAbility = null;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default getPokemonAbilitySlice.reducer;
