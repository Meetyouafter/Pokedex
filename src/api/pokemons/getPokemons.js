import axios from "axios";

const GET_ALL_POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
const GET_20_POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=20'

const getAllPokemons = axios.get(GET_ALL_POKEMONS_URL);
const get20Pokemons = axios.get(GET_20_POKEMONS_URL);

const PokemonsServises = { getAllPokemons, get20Pokemons };

export default PokemonsServises;
