/* eslint-disable no-unsafe-optional-chaining */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Grid, FormControl, MenuItem, Select, InputLabel, Pagination, useMediaQuery,
} from '@mui/material';
import Loader from '../loader/loader';
import PokemonItem from '../pokemon/pokemon';
import PokemonsServices from '../../api/pokemons/getPokemons';

const PokedexPagination = () => {
  const [pokeQuantity, setPokeQuantity] = useState(10);
  const [page, setPage] = useState(1);
  const [pagesQuantity, setPagesQuantity] = useState(0);
  const [pokemons, setPokemons] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const point500px = useMediaQuery('(min-width:500px)');

  useEffect(() => {
    PokemonsServices.getSomePokemons({
      offset: (page - 1) * pokeQuantity,
      limit: pokeQuantity,
    })
      .then((response) => {
        setPagesQuantity(Math.ceil(response?.data?.count / pokeQuantity));
        return response.data.results;
      })
      .then((data) => {
        const requests = data.map((pokemon) => axios.get(pokemon.url));
        return Promise.all(requests);
      })
      .then((responses) => {
        const newArray = responses.map((el) => {
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
        });
        setPokemons(newArray);
        setIsLoading(false);
      });
  }, [pokeQuantity, page]);

  return isLoading ? (
    <Loader />
  ) : (
    <Grid container sx={{ padding: '5% 10%', flexDirection: 'column' }}>
      <Grid item>
        <Link to="/" style={{ paddingBottom: '15px', display: 'inline-block', paddingRight: '20px' }}>See all pokemons with filter and pagination</Link>
        <Link to="/pokemons" style={{ paddingBottom: '15px', display: 'inline-block' }}>See all pokemons with filter</Link>
      </Grid>
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
          sx={{ pt: '10px', pb: '10px' }}
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
          .map((pokemonStats) => (
            <PokemonItem
              key={pokemonStats.name}
              pokemonStats={pokemonStats}
            />
          ))}
      </Grid>
    </Grid>
  );
};

export default PokedexPagination;
