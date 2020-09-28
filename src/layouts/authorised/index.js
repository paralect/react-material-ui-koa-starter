import PropTypes from 'prop-types';
import React from 'react';
import { Container } from '@material-ui/core';

function AuthorisedLayout({ children }) {
  return <Container component="main">{children}</Container>;
}

AuthorisedLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthorisedLayout;
