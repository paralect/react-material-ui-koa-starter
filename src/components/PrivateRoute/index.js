import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { Route, Redirect } from 'react-router-dom';

import routes from 'routes';
import { useAuthenticated } from 'resources/user';

function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = useAuthenticated();

  const render = useCallback(
    ({ location }) =>
      isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: routes.signIn.path,
            state: { from: location },
          }}
        />
      ),
    [children, isAuthenticated]
  );

  return <Route {...rest} render={render} />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
