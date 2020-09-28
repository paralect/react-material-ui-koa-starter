import PropTypes from 'prop-types';
import React from 'react';
import {
  AppBar,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useSignOut } from 'resources/user';
import useStyles from './styles';

function PageContent({ title, children }) {
  const [signOut] = useSignOut();
  const classes = useStyles();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={1}
        color="inherit"
        className={classes.appBar}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title} noWrap>
            {title}
          </Typography>
          <IconButton aria-label="sign out" onClick={signOut}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarDummy} />
      <Paper className={classes.contentBoundary}>{children}</Paper>
    </>
  );
}

PageContent.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

export default PageContent;
