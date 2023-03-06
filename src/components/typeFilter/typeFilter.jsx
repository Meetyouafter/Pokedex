import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const TypeFilter = ({ types, setTypes }) => {
  const handleClick = (e) => {
    setTypes([...types, e.target.name]);
  };

  const handleClickReset = () => {
    setTypes([]);
  };

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button name="normal" onClick={handleClick}>Normal</Button>
      <Button name="grass" onClick={handleClick}>Grass</Button>
      <Button name="fire" onClick={handleClick}>Fire</Button>
      <Button name="water" onClick={handleClick}>Water</Button>
      <Button name="bug" onClick={handleClick}>Bug</Button>
      <Button name="electric" onClick={handleClick}>Electric</Button>
      <Button name="rock" onClick={handleClick}>Rock</Button>
      <Button name="ghost" onClick={handleClick}>Ghost</Button>
      <Button name="poison" onClick={handleClick}>Poison</Button>
      <Button name="psychic" onClick={handleClick}>Psychic</Button>
      <Button name="fighting" onClick={handleClick}>Fighting</Button>
      <Button name="ground" onClick={handleClick}>Ground</Button>
      <Button name="dragon" onClick={handleClick}>Dragon</Button>
      <Button name="reset" onChange={handleClickReset}>Reset</Button>
    </ButtonGroup>
  );
};

export default TypeFilter;
