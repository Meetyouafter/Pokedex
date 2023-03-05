import axios from "axios";
import Loader from '../loader/Loader.jsx'
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PokemonsServises from "../../api/pokemons/getPokemons";
import getPokemons from "../../store/slices/pokemon/getPokemons";
import Pokemon from "../item/pokemon.jsx";

const Pokemons = () => {
  const dispatch = useDispatch();

  const pokemonsState = useSelector(state => state.pokemons)
  const { isLoading } = pokemonsState;
  const pokemons = pokemonsState.pokemons?.results;
  console.log(pokemons)

  useEffect(() => {
    dispatch(getPokemons())
  }, [dispatch])

  return (
    isLoading ? <Loader /> : <div>
      {pokemons.map(el => {
        return <Pokemon key={el.name} pokemonData={el} />
      })}

    </div>
  )
};

export default Pokemons;