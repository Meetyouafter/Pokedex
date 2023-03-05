import { createAsyncThunk } from '@reduxjs/toolkit';
import PokemonsServises from '../../../api/pokemons/getPokemons';

const getPokemons = createAsyncThunk(
  'api/v2',
  async (thunkAPI) => {
  try {
    const result = await PokemonsServises.get20Pokemons;

    return result.data;
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export default getPokemons;
