import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  logo: {
    ...theme.mixins.toolbar,
    fontFamily: 'Lato',
    textDecoration: 'none',
  },
}));

function Logo() {
  const classes = useStyles();

  return (
    <Box
      component={Link}
      to="/"
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={classes.logo}
    >
      <Typography variant="h4" component="span" color="primary">
        Brand name
      </Typography>
    </Box>
  );
}

export default Logo;
