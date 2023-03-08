import React from 'react';
import { CircularProgress, Container } from '@mui/material';

const Loader = () => (
  <Container
    sx={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress />
  </Container>
);

export default Loader;
