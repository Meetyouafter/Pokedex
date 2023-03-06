import { createAsyncThunk } from '@reduxjs/toolkit';
import PokemonsServises from '../../../api/pokemons/getPokemons';

const getAllPokemons = createAsyncThunk(
  'api/v2/all',
  async (thunkAPI) => {
    try {
      const result = await PokemonsServises.getAllPokemons();

      return result.data;
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export default getAllPokemons;
