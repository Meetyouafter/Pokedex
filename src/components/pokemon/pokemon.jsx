/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid, Card, CardActions, CardContent, CardMedia, Button, Typography,
} from '@mui/material';
import Loader from '../loader/Loader';

const PokemonItem = ({ url, pokemonData }) => {
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`${url}`)
      .then((response) => {
        const {
          weight, height, base_experience, types, name,
        } = response.data;
        const image = response.data.sprites?.front_default;
        const flatTypes = types.map((el) => el.type.name);

        setStats({
          ...stats, weight, name, height, base_experience, image, types: flatTypes,
        });
        setIsLoading(false);
      });
  }, [url, stats]);

  return (
    isLoading ? <Loader />
      : (
        <Grid
          item
          sx={{
            display: 'flex',
            border: '1px solid gray',
            alignItems: 'center',
            padding: '0px',
            minWidth: 165,
          }}
        >
          <Card sx={{ minWidth: 165 }}>
            <CardMedia
              component="img"
              image={stats.image}
              title={stats.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
                {stats.name}
              </Typography>
              <Typography variant="subtitle2">
                Exp:
                {' '}
                {stats.base_experience}
              </Typography>
              <Typography variant="subtitle2">
                Height:
                {' '}
                {stats.height}
              </Typography>
              <Typography variant="subtitle2">
                Weight:
                {' '}
                {stats.weight}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Types:
                {' '}
              </Typography>
              {stats.types.map((el) => (
                <Typography
                  key={el}
                  sx={{
                    display: 'inline-block',
                    backgroundColor: 'turquoise',
                    borderRadius: '8px',
                    textAlign: 'center',
                    minWidth: '50px',
                    marginRight: '5px',
                  }}
                >
                  {el}

                </Typography>
              ))}
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
            </CardActions>
          </Card>
        </Grid>
      )
  );
};

export default PokemonItem;
