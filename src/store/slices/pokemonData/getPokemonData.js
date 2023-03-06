import { createAsyncThunk } from '@reduxjs/toolkit';
import PokemonsServises from '../../../api/pokemons/getPokemons';

const getPokemonData = createAsyncThunk(
  'api/v2/pokemon',
  async (data, thunkAPI) => {
  try {
    const result = await PokemonsServises.getPokemonData(data);

    return result.data;
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export default getPokemonData;
