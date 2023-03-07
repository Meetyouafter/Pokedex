import React, { useEffect } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import getPokemonData from '../../store/slices/pokemonData/getPokemonData';
import Loader from '../loader/Loader';

const PokeCard = ({ pokemonData }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.pokemonData);
  const image = useSelector((state) => state.pokemonData.pokemonData?.sprites?.front_default);
  const stats = useSelector((state) => state.pokemonData?.pokemonData);

  console.log('stats', stats)

  useEffect(() => {
    dispatch(getPokemonData(pokemonData.url));
  }, [dispatch, pokemonData.url]);

  return (
    isLoading ? <Loader />
      : (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            image={image}
            title={pokemonData.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {pokemonData.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Height:
              {' '}
              {stats.height}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Weight:
              {' '}
              {stats.weight}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              Exp:
              {' '}
              {stats.base_experience}
            </Typography>

            {stats.stats.map((el) => (
              <Typography key={el.stat.name}>
                {el.stat.name}
                :
                {el.base_stat}
              </Typography>
            ))}
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      )
  );
};

export default PokeCard;
