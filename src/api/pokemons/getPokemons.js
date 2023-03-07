import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/';

const getSomePokemons = (data) => axios.get(`${BASE_URL}pokemon?offset=${data.offset}&limit=${data.limit}`);
const getAllPokemons = () => axios.get(`${BASE_URL}pokemon?limit=10000`);

const PokemonsServices = {
  getSomePokemons, getAllPokemons,
};

export default PokemonsServices;
