import { createAsyncThunk } from '@reduxjs/toolkit';
import PokemonsServices from '../../../api/pokemons/getPokemons';

const getSomePokemons = createAsyncThunk(
  'api/v2',
  async (data, thunkAPI) => {
    try {
      const result = await PokemonsServices.getSomePokemons(data);

      return result.data;
    } catch (error) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export default getSomePokemons;
