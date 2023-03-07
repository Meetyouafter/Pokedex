/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid, Card, CardActions, CardContent, CardMedia, Button, Typography,
} from '@mui/material';
import Loader from '../loader/Loader';

const PokemonItem2 = ({ pokemonData }) => {

  return (
 (
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
              image={pokemonData.image}
              title={pokemonData.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center' }}>
                {pokemonData.name}
              </Typography>
              <Typography variant="subtitle2">
                Exp:
                {' '}
                {pokemonData.base_experience}
              </Typography>
              <Typography variant="subtitle2">
                Height:
                {' '}
                {pokemonData.height}
              </Typography>
              <Typography variant="subtitle2">
                Weight:
                {' '}
                {pokemonData.weight}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Types:
                {' '}
              </Typography>
              {pokemonData.types.map((el) => (
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

export default PokemonItem2;
