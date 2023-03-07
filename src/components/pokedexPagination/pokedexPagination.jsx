/* eslint-disable no-unsafe-optional-chaining */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid, FormControl, MenuItem, Select, InputLabel, Pagination, useMediaQuery,
} from '@mui/material';
import Loader from '../loader/Loader';
import getSomePokemons from '../../store/slices/somePokemons/getSomePokemons';
import PokemonItem from '../pokemon/pokemon';

const PokedexPagination = () => {
  const [pokeQuantity, setPokeQuantity] = useState(10);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);

  const dispatch = useDispatch();
  const point500px = useMediaQuery('(min-width:500px)');

  const pokemonsState = useSelector((state) => state.pokemons);
  const { isLoading } = pokemonsState;
  const pokemons = pokemonsState.pokemons?.results;

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
    <Grid container sx={{ padding: '5% 10%', flexDirection: 'column' }}>
      <Grid item sx={{ width: point500px ? '20%' : '100%' }}>
        <FormControl fullWidth>
          <InputLabel id="select-label">On page</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={pokeQuantity}
            label="quantity"
            onChange={(e) => setPokeQuantity(e.target.value)}
            sx={{ height: '40px' }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Pagination
          count={pagesQuantity}
          page={page}
          onChange={(_, num) => setPage(num)}
          siblingCount={0}
          showFirstButton={!!point500px}
          showLastButton={!!point500px}
          sx={{ pt: '10px', pb: '10px', justifyContent: 'center' }}
        />
      </Grid>
      <Grid
        item
        container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0px',
          minWidth: 165,
          width: '100%',
          columnGap: '2%',
          rowGap: '10px',
        }}
      >
        {pokemons
          .map((el) => <PokemonItem key={el.name} url={el.url} />)}
      </Grid>
    </Grid>
  );
};

export default PokedexPagination;
