import { createSlice } from "@reduxjs/toolkit"
import getPokemons from "./getPokemons"


const initialState = {
  pokemons: null,
  isLoading: true,
  error: null,
}

const getPokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  extraReducers: {
    [getPokemons.pending]: (state) => {
      state.pokemons = null;
      state.isLoading =true;
      state.error = null;
    },
    [getPokemons.fulfilled]: (state, action) => {
      state.pokemons = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [getPokemons.rejected]: (state, action) => {
      state.pokemons = null;
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})

export default getPokemonsSlice.reducer;
