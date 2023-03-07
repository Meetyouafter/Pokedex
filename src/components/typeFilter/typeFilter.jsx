import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const TypeFilter = ({ setTypes }) => {
  const handleClick = (e) => {
    setTypes(e.target.name);
  };

  return (
    <ButtonGroup
      variant="contained"
      aria-label="outlined primary button group"
      sx={{
        mt: '5px', mb: '5px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', rowGap: '3px', columnGap: '3px',
      }}
    >
      <Button name="normal" color="primary" onClick={handleClick}>Normal</Button>
      <Button name="grass" color="primary" onClick={handleClick}>Grass</Button>
      <Button name="fire" color="primary" onClick={handleClick}>Fire</Button>
      <Button name="water" color="primary" onClick={handleClick}>Water</Button>
      <Button name="bug" color="primary" onClick={handleClick}>Bug</Button>
      <Button name="electric" color="primary" onClick={handleClick}>Electric</Button>
      <Button name="rock" color="primary" onClick={handleClick}>Rock</Button>
      <Button name="ghost" color="primary" onClick={handleClick}>Ghost</Button>
      <Button name="poison" color="primary" onClick={handleClick}>Poison</Button>
      <Button name="psychic" color="primary" onClick={handleClick}>Psychic</Button>
      <Button name="fighting" color="primary" onClick={handleClick}>Fighting</Button>
      <Button name="ground" color="primary" onClick={handleClick}>Ground</Button>
      <Button name="dragon" color="primary" onClick={handleClick}>Dragon</Button>
    </ButtonGroup>
  );
};

export default TypeFilter;
