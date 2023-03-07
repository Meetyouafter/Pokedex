import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid, TextField, Typography,
} from '@mui/material';
import Loader from '../loader/loader';
import PokemonItem from '../pokemon/pokemon';
import TypeFilter from '../typeFilter/typeFilter';
import getAllPokemons from '../../store/slices/allPokemons/getAllPokemons';

const AllPokemons = () => {
  const [query, setQuery] = useState('');
  const [typeForFilter, setTypeForFilter] = useState('');

  const dispatch = useDispatch();
  const allPokemonsState = useSelector((state) => state.allPokemons);
  const { isLoading } = allPokemonsState;
  const { pokemons } = allPokemonsState;

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

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
        {pokemons
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
