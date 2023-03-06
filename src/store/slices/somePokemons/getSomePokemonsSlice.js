import { createSlice } from '@reduxjs/toolkit';
import getSomePokemons from './getSomePokemons';

const initialState = {
  pokemons: null,
  isLoading: true,
  error: null,
};

const getSomePokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  extraReducers: {
    [getSomePokemons.pending]: (state) => {
      state.pokemons = null;
      state.isLoading = true;
      state.error = null;
    },
    [getSomePokemons.fulfilled]: (state, action) => {
      state.pokemons = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [getSomePokemons.rejected]: (state, action) => {
      state.pokemons = null;
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default getSomePokemonsSlice.reducer;
