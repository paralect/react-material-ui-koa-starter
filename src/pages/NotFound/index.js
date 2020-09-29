import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';

import routes from 'routes';

function NotFound() {
  return (
    <>
      <Typography component="h1" variant="h1">
        404
      </Typography>
      <Typography variant="h5" paragraph>
        Not found
      </Typography>

      <Button component={Link} to={routes.home.path} color="primary">
        Go to the Home page
      </Button>
    </>
  );
}

export default NotFound;
