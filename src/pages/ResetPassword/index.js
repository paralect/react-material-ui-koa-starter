import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';

import routes from 'src/routes';
import useSearchParams from 'hooks/use-search-params';
import { useSubmit } from 'helpers/formik.helper';
import { useSetPassword } from 'resources/user';
import AuthForm from 'components/AuthForm';
import Password from 'components/Password';

function ResetPassword() {
  const resetToken = useSearchParams('token');
  const [setPassword] = useSetPassword();
  const onSubmit = useSubmit(setPassword);

  if (!resetToken) {
    return <Redirect to="/not-found" />;
  }

  return (
    <AuthForm
      initialValues={{ token: resetToken, password: '' }}
      title="New Password"
      submitLabel="Set"
      onSubmit={onSubmit}
      additionalAction={
        <Button
          component={Link}
          to={routes.signUp.path}
          color="primary"
          fullWidth
        >
          Sign Up
        </Button>
      }
    >
      <Password label="New Password" name="password" autoFocus />
    </AuthForm>
  );
}

export default ResetPassword;
