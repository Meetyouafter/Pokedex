import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import getPokemonData from '../../store/slices/pokemonData/getPokemonData';
import Loader from '../loader/Loader.jsx';
import getPokemonAbility from '../../store/slices/pokemonAbility/getPokemonAbility';

const PokeCard = ({ pokemonData }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.pokemonData);
  const data = useSelector(state => state.pokemonData);
  const ability = useSelector(state => state.pokemonAbility?.pokemonAbility);
  const image = useSelector(state => state.pokemonData?.pokemonData?.sprites?.front_default);
  const stats = useSelector(state => state.pokemonData?.pokemonData);
  console.log(data)
  console.log(stats)
  console.log(ability)

  useEffect(() => {
    dispatch(getPokemonData(pokemonData.url))
      .then((response) => dispatch(getPokemonAbility(response.payload.id)))
  }, [])

  console.log(stats?.id)

  return (
    isLoading ? <Loader /> :
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
          Height: {stats.height}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Weight: {stats.weight}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Exp: {stats.base_experience}
        </Typography>
        

      
        <Typography variant="body2" color="text.secondary">
        {ability?.effect_entries[1].effect}
        </Typography>
        {stats.stats.map(el => {
          return (
            <Typography key={el.stat.name}>
          {el.stat.name}
          :
          {el.base_stat}
          </Typography>
          )
        })}
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default PokeCard;
