import React from 'react';
import { Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error = ({ error }) => {
  const navigate = useNavigate();
  if (!error) setTimeout(() => navigate('/'), 2000);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h2" sx={{ textAlign: 'center' }}>
        {error ? `${error}` : 'Sorry. This page does not exist'}
      </Typography>
    </Box>

  );
};

export default Error;
