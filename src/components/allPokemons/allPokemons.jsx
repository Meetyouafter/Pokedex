import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid, TextField, Typography,
} from '@mui/material';
import axios from 'axios';
import Loader from '../loader/loader';
import PokemonItem from '../pokemon/pokemon';
import PokemonsServices from '../../api/pokemons/getPokemons';
import TypeFilter from '../typeFilter/typeFilter';

const AllPokemons = () => {
  const [query, setQuery] = useState('');
  const [allPokemons, setAllPokemons] = useState('');
  const [typeForFilter, setTypeForFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    PokemonsServices.getAllPokemons()
      .then((response) => response.data.results)
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
        setAllPokemons(newArray);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Grid container sx={{ padding: '5% 10%', flexDirection: 'column', overflow: 'auto' }}>
      <Grid item>
        <Link to="/" style={{ paddingBottom: '15px', display: 'inline-block', paddingRight: '20px' }}>See all pokemons with filter and pagination</Link>
        <Link to="/pokedex-list" style={{ paddingBottom: '15px', display: 'inline-block' }}>See pokemons with pagination</Link>
      </Grid>
      <Grid item sx={{ pb: '15px' }}>
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
      <Typography variant="h5">
        Press type for sort. Now
        {' '}
        {typeForFilter ? `sorted by ${typeForFilter}` : 'no sorted'}
      </Typography>
      <TypeFilter setTypes={setTypeForFilter} />

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
        {allPokemons
          .filter((el) => el.name.includes(query))
          .filter((el) => (typeForFilter ? el.types.includes(typeForFilter) : el))
          .map((pokemonStats) => (
            <PokemonItem
              key={pokemonStats.name}
              pokemonStats={pokemonStats}
              typeForFilter={typeForFilter}
              setTypeForFilter={setTypeForFilter}
            />
          ))}
      </Grid>
    </Grid>
  );
};

export default AllPokemons;
