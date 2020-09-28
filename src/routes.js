import { generatePath } from 'react-router-dom';

import { Layout } from 'constants/layout';

const defaults = {
  url(params = {}, options = {}) {
    return {
      ...options,
      pathname: generatePath(this.path, params),
    };
  },
};

export default {
  // Public
  signIn: {
    ...defaults,
    path: '/signin',
    layout: Layout.PUBLIC,
    page: 'SignIn',
  },
  signUp: {
    ...defaults,
    path: '/signup',
    layout: Layout.PUBLIC,
    page: 'SignUp',
  },
  forgot: {
    ...defaults,
    path: '/forgot-password',
    layout: Layout.PUBLIC,
    page: 'ForgotPassword',
  },
  reset: {
    ...defaults,
    path: '/reset-password',
    layout: Layout.PUBLIC,
    page: 'ResetPassword',
  },

  // Private
  home: {
    ...defaults,
    path: '/',
    exact: true,
    private: true,
    layout: Layout.AUTHORIZED,
    page: 'Home',
  },
};
