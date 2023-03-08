import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import PokemonsServices from '../../../api/pokemons/getPokemons.js';

const getAllPokemons = createAsyncThunk(
  'api/v2/all',
  async (thunkAPI) => {
    try {
      const result = await PokemonsServices.getAllPokemons()
        .then((response) => response.data.results)
        .then((data) => {
          const requests = data.map((pokemon) => axios.get(pokemon.url));
          return Promise.all(requests);
        })
        .then((responses) => responses.map((el) => {
          const { name } = el.data;
          const { types } = el.data;
          const { weight } = el.data;
          const { height } = el.data;
          const { stats } = el.data;
          const image = el.data.sprites?.front_default;
          const flatTypes = types.map((type) => type.type.name);
          return {
            name, image, types: flatTypes, weight, height, stats,
          };
        }));
      return result;
    } catch (error) {
      const message = error.response.data;

      return thunkAPI.rejectWithValue(message);
    }
  },
);

export default getAllPokemons;
