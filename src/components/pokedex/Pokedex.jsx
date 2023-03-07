import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid, TextField, FormControl, MenuItem, Select, InputLabel, Pagination, Typography,
} from '@mui/material';
import Loader from '../loader/Loader';
import getSomePokemons from '../../store/slices/somePokemons/getSomePokemons';
import PokemonItem from '../pokemon/pokemon';
import getAllPokemons from '../../store/slices/allPokemons/getAllPokemons';
import './styles.scss';
import axios from 'axios';
import TypeFilter from '../typeFilter/typeFilter';
import PokemonsServices from '../../api/pokemons/getPokemons';
import PokemonItem2 from '../pokemon/pokemon2';

const Pokedex = () => {
  const [query, setQuery] = useState('');
  const [pokeQuantity, setPokeQuantity] = useState(10);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);
  const [types, setTypes] = useState([]);
  const [allPokemons2, setAllPokemons2] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const pokemonsState = useSelector((state) => state.pokemons);
  const pokemons = pokemonsState.pokemons?.results;

  // console.log('allPokemons', allPokemons);
  // console.log(types);
  // console.log(pokemons);
  // console.log(pokemonsState.pokemons);

  useEffect(() => {
    PokemonsServices.getAllPokemons()
      .then((response) => {
        return response.data.results
      })
      .then((data) => {
        const requests = data.map((pokemon) => axios.get(pokemon.url));
        return Promise.all(requests);
      })
      .then((responses) => {
        console.log(responses)

        const newArray = responses.map((el) => {
          const { name } = el.data;
          const { types } = el.data;
          const { weight } = el.data;
          const { height } = el.data;
          const { stats } = el.data;
          const image = el.data.sprites?.front_default;
          const flatTypes = types.map((type) => type.type.name);
          return { name, image, types: flatTypes, weight, height, stats };
        });
        setAllPokemons2(newArray);
        console.log(allPokemons2)
        setIsLoading(false)
      });
  }, [allPokemons2, dispatch]);

  useEffect(() => {
    dispatch(getSomePokemons({
      offset: (page - 1) * pokeQuantity,
      limit: pokeQuantity,
    }))
      .then((response) => {
        setPagesQuantity(Math.ceil(response?.payload?.count / pokeQuantity));
      });
  }, [dispatch, pokeQuantity, page]);

  return isLoading ? (
    <Loader />
  ) : (
    <Grid container sx={{ padding: '2% 5%', flexDirection: 'column' }}>
      <Grid item container>
        <Grid item sx={{ width: '80%' }}>
          <TextField
            id="search"
            label="Search field"
            type="search"
            variant="outlined"
            fullWidth
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>
        <Grid item sx={{ width: '20%' }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">On page</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              value={pokeQuantity}
              label="quantity"
              onChange={(e) => setPokeQuantity(e.target.value)}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {query !== ''
        ? (
          <>
            {types.map((type) => <Typography key={type}>{type}</Typography>)}
            <TypeFilter types={types} setTypes={setTypes} />
            {allPokemons2
              .filter((el) => el.name.includes(query))
              .filter((el) => (types.length
                ? el.types.every((element) => types.includes(element))
                : el))
              .map((el) => <PokemonItem2 key={el.name} pokemonData={el} />)}
          </>
        )
        : (
          <>
            <Grid item>
              <Pagination
                count={pagesQuantity}
                page={page}
                onChange={(_, num) => setPage(num)}
                showFirstButton
                showLastButton
              />
            </Grid>
            {pokemons
              .map((el) => <PokemonItem key={el.name} url={el.url} />)}
          </>
        )}
    </Grid>
  );
};

export default Pokedex;
