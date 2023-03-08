import { createSlice } from '@reduxjs/toolkit';
import getAllPokemons from './getAllPokemons.js';

const initialState = {
  pokemons: null,
  isLoading: true,
  error: null,
};

const getAllPokemonsSlice = createSlice({
  name: 'allPokemons',
  initialState,
  extraReducers: {
    [getAllPokemons.pending]: (state) => {
      state.pokemons = null;
      state.isLoading = true;
      state.error = null;
    },
    [getAllPokemons.fulfilled]: (state, action) => {
      state.pokemons = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [getAllPokemons.rejected]: (state, action) => {
      state.pokemons = null;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default getAllPokemonsSlice.reducer;
