import { useHistory, useLocation } from 'react-router-dom';
import { queryCache, useMutation } from 'react-query';

import routes from 'src/routes';
import { signIn, signUp, signOut, reset } from './user.api';

export function useAuthenticated() {
  const currentUser = queryCache.getQueryData('currentUser');

  return Boolean(currentUser);
}

export function useSignIn() {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: routes.home.path } };

  return useMutation(signIn, {
    onSuccess: async () => {
      await queryCache.invalidateQueries('currentUser', {
        refetchInactive: true,
      });
      history.replace(from);
    },
    onError: (e) => {
      throw e;
    },
  });
}

export function useSignUp() {
  const history = useHistory();

  return useMutation(signUp, {
    onSuccess: () => history.push(routes.signIn.path),
    onError: (e) => {
      throw e;
    },
  });
}

export function useSignOut() {
  const history = useHistory();

  return useMutation(signOut, {
    onSuccess: async () => {
      await queryCache.setQueryData('currentUser', () => undefined);
      history.replace(routes.home.path);
    },
  });
}

export function useSetPassword() {
  const history = useHistory();

  return useMutation(reset, {
    onSuccess: () => void history.push(routes.signIn.path),
    onError: (e) => {
      throw e;
    },
  });
}
