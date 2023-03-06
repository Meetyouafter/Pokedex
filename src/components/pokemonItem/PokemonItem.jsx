import React, { useState } from 'react';
import {
  Grid, Typography, Modal, Box,
} from '@mui/material';
import PokeCard from '../pokeCard/pokeCard';

const PokemonItem = ({ pokemonData }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Grid
      item
      sx={{
        display: 'flex',
        border: '1px solid gray',
        alignItems: 'center',
        padding: '0px',
        height: '40px',
      }}
    >
      <div>
        <Typography onClick={handleOpen}>{pokemonData.name}</Typography>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {pokemonData.name}
            </Typography>
            <PokeCard pokemonData={pokemonData} />
          </Box>
        </Modal>
      </div>
    </Grid>
  );
};

export default PokemonItem;
