import PropTypes from 'prop-types';
import React from 'react';
import { Box } from '@material-ui/core';

function PublicLayout({ children }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{ width: '100vw', height: '100vh' }}
    >
      {children}
    </Box>
  );
}

PublicLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicLayout;
