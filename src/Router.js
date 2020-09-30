import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { queryCache } from 'react-query';
import loadable from '@loadable/component';

import routes from 'routes';
import { Layout } from 'constants/layout';
import { userApi } from 'resources/user';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';
import FullScreenLoader from 'components/FullScreenLoader';

// Layouts
import AuthorisedLayout from 'layouts/authorised';
import PublicLayout from 'layouts/public';

// Static pages
import NotFound from 'pages/NotFound';

const layouts = {
  [Layout.AUTHORIZED]: AuthorisedLayout,
  [Layout.PUBLIC]: PublicLayout,
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
    return <FullScreenLoader />;
  }

  return (
    <BrowserRouter>
      <Switch>
        {Object.values(routes).map((route) => {
          const RouteComponent = route.private ? PrivateRoute : PublicRoute;
          const PageLayout = layouts[route.layout];
          const Page = loadable(() => import(`pages/${route.page}`));

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
