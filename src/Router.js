import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { queryCache } from 'react-query';
import { Box, CircularProgress } from '@material-ui/core';

import routes from 'src/routes';
import { Layout } from 'constants/layout';
import { userApi } from 'resources/user';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';

// Layouts
import AuthorisedLayout from 'layouts/authorised';
import PublicLayout from 'layouts/public';

// Pages
import NotFound from 'pages/NotFound';
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import ForgotPassword from 'pages/ForgotPassword';
import ResetPassword from 'pages/ResetPassword';
import Home from 'pages/Home';

const layouts = {
  [Layout.AUTHORIZED]: AuthorisedLayout,
  [Layout.PUBLIC]: PublicLayout,
};

const pages = {
  SignUp,
  SignIn,
  ForgotPassword,
  ResetPassword,
  Home,
};

function Router() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        await queryCache.fetchQuery('currentUser', userApi.getCurrentUser);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
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

  return (
    <BrowserRouter>
      <Switch>
        {Object.values(routes).map((route) => {
          const RouteComponent = route.private ? PrivateRoute : PublicRoute;
          const PageLayout = layouts[route.layout];
          const Page = pages[route.page];

          return (
            <RouteComponent key={route.path} {...route}>
              <PageLayout title={route.title} action={route.action}>
                <Page />
              </PageLayout>
            </RouteComponent>
          );
        })}

        <Route path="*">
          <PublicLayout>
            <NotFound />
          </PublicLayout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
