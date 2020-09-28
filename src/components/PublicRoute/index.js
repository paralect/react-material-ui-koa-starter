import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Route, Redirect } from 'react-router-dom';

import routes from 'src/routes';
import { useAuthenticated } from 'resources/user';

function PublicRoute({ children, ...rest }) {
  const isAuthenticated = useAuthenticated();
  const render = useCallback(
    () => (isAuthenticated ? <Redirect to={routes.home.path} /> : children),
    [children, isAuthenticated]
  );

  return <Route {...rest} render={render} />;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
