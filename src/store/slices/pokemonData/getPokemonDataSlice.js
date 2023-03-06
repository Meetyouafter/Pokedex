import { createSlice } from '@reduxjs/toolkit';
import getPokemonData from './getPokemonData';

const initialState = {
  pokemonData: null,
  isLoading: true,
  error: null,
};

const getPokemonDataSlice = createSlice({
  name: 'pokemonData',
  initialState,
  extraReducers: {
    [getPokemonData.pending]: (state) => {
      state.pokemonData = null;
      state.isLoading = true;
      state.error = null;
    },
    [getPokemonData.fulfilled]: (state, action) => {
      state.pokemonData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [getPokemonData.rejected]: (state, action) => {
      state.pokemonData = null;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default getPokemonDataSlice.reducer;
