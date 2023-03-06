import { createAsyncThunk } from '@reduxjs/toolkit';
import PokemonsServises from '../../../api/pokemons/getPokemons';

const getPokemonAbility = createAsyncThunk(
  'api/v2/ability',
  async (name, thunkAPI) => {
  try {
    const result = await PokemonsServises.getPokemonAbility(name);

    return result.data;
  } catch (error) {
    const message = error.response.data;
    return thunkAPI.rejectWithValue(message);
  }
});

export default getPokemonAbility;
