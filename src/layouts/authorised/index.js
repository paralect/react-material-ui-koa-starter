import PropTypes from 'prop-types';
import React from 'react';
import { Container } from '@material-ui/core';

function AuthorisedLayout({ children }) {
  return <Container>{children}</Container>;
}

AuthorisedLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthorisedLayout;
