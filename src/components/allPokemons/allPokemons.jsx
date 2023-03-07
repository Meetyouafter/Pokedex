import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid, TextField,
} from '@mui/material';
import Loader from '../loader/loader';
import PokemonItem from '../pokemon/pokemon';
import getAllPokemons from '../../store/slices/allPokemons/getAllPokemons';

const AllPokemons = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const allPokemons = useSelector((state) => state.allPokemons?.pokemons?.results);

  useEffect(() => {
    dispatch(getAllPokemons())
      .then(() => setIsLoading(false));
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
    <Grid container sx={{ padding: '5% 10%', flexDirection: 'column', overflow: 'auto' }}>
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
          .map((el) => <PokemonItem key={el.name} url={el.url} />)}
      </Grid>
    </Grid>
  );
};

export default AllPokemons;
