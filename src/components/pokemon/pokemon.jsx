/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardActions, CardContent, CardMedia, Typography, useMediaQuery,
} from '@mui/material';
import Loader from '../loader/loader';
import ModalWindow from '../modalWindow/modalWindow';

const PokemonItem = ({ url }) => {
  const [pokemonStats, setPokemonStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const point500px = useMediaQuery('(min-width:500px)');

  useEffect(() => {
    axios.get(`${url}`)
      .then((response) => {
        const {
          weight, height, base_experience, types, name, stats,
        } = response.data;
        const image = response.data.sprites?.front_default;
        const flatTypes = types.map((el) => el.type.name);

        setPokemonStats({
          ...stats, weight, name, height, base_experience, image, types: flatTypes, stats,
        });
        setIsLoading(false);
      });
  }, [url]);

  return (
    isLoading ? <Loader />
      : (
        <Card sx={{
          minWidth: 165, minHeight: '450px', width: point500px ? '20%' : '31%', border: '1px solid gray',
        }}
        >
          <CardMedia
            component="img"
            image={pokemonStats.image}
            title={pokemonStats.name}
            sx={{ width: '163px', height: '163px' }}
          />
          <CardContent sx={{ winHeight: '230px' }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
              {pokemonStats.name}
            </Typography>
            <Typography variant="subtitle2">
              Exp:
              {' '}
              {pokemonStats.base_experience}
            </Typography>
            <Typography variant="subtitle2">
              Height:
              {' '}
              {pokemonStats.height}
            </Typography>
            <Typography variant="subtitle2">
              Weight:
              {' '}
              {pokemonStats.weight}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              Types:
              {' '}
            </Typography>
            {pokemonStats.types.map((type) => (
              <Typography
                key={type}
                sx={{
                  display: 'inline-block',
                  backgroundColor: 'turquoise',
                  borderRadius: '8px',
                  textAlign: 'center',
                  minWidth: '60px',
                  marginRight: '5px',
                }}
              >
                {type}
              </Typography>
            ))}
          </CardContent>
          <CardActions>
            <ModalWindow stats={pokemonStats.stats} />
          </CardActions>
        </Card>
      )
  );
};

export default PokemonItem;
