import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid, TextField, FormControl, MenuItem, Select, InputLabel, Pagination,
} from '@mui/material';
import Loader from '../loader/Loader';
import getSomePokemons from '../../store/slices/somePokemons/getSomePokemons';
import PokemonItem from '../pokemonItem/PokemonItem';
import getAllPokemons from '../../store/slices/allPokemons/getAllPokemons';
import './styles.scss';

const Pokedex = () => {
  const [query, setQuery] = useState('');
  const [pokeQuantity, setPokeQuantity] = useState(10);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);

  const dispatch = useDispatch();

  const pokemonsState = useSelector((state) => state.pokemons);
  const allPokemons = useSelector((state) => state.allPokemons.pokemons?.results);
  const { isLoading } = pokemonsState;
  const pokemons = pokemonsState.pokemons?.results;

  console.log('allPokemons', allPokemons);
  console.log(pokemons);
  console.log(pokemonsState.pokemons);

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getSomePokemons({
      name: query,
      offset: (page - 1) * pokeQuantity,
      limit: pokeQuantity,
    }))
      .then((response) => {
        setPagesQuantity(Math.ceil(response?.payload?.count / pokeQuantity));
      });
  }, [dispatch, pokeQuantity, page, query]);

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
        ? (allPokemons
          .filter((el) => el.name.includes(query))
          .map((el) => <PokemonItem key={el.name} pokemonData={el} />))
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
              .map((el) => <PokemonItem key={el.name} pokemonData={el} />)}
          </>
        )}
    </Grid>
  );
};

export default Pokedex;
