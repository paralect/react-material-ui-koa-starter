import React from 'react';
import { Typography } from '@material-ui/core';

import PageContent from 'components/PageContent';

function Home() {
  return (
    <PageContent title="Home page">
      <Typography variant="h4" component="h1" align="center" paragraph>
        Hello there :)
      </Typography>
      <Typography variant="body1" align="center">
        Make yourself at home
      </Typography>
    </PageContent>
  );
}

export default Home;
