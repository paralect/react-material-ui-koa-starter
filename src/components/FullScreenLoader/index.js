import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

function FullScreenLoader() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{ width: '100vw', height: '100vh' }}
    >
      <CircularProgress />
    </Box>
  );
}

export default FullScreenLoader;
