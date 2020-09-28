import { apiClient } from 'services/api';

export const signIn = (data) => apiClient.post('/account/signin', data);

export const signUp = (data) => apiClient.post('/account/signup', data);

export const forgot = (data) =>
  apiClient.post('/account/forgot-password', data);

export const reset = ({ password, token }) =>
  apiClient.put('/account/reset-password', { password, token });

export const signOut = () => apiClient.post('/account/logout');

export const getCurrentUser = () => apiClient.get('/users/current');

export const emailExists = async (email) => {
  const { exists } = await apiClient.get('/validate/email', { email });

  return !exists;
};
