import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import routes from 'routes';
import { useSubmit } from 'helpers/formik.helper';
import { useSignIn } from 'resources/user';
import AuthForm from 'components/AuthForm';
import FormField from 'components/FormField';
import Password from 'components/Password';

function SignIn() {
  const [signIn] = useSignIn();
  const onSubmit = useSubmit(signIn);

  return (
    <AuthForm
      initialValues={{ email: '', password: '' }}
      title="Sign In"
      submitLabel="Sign In"
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
      <FormField name="email" label="Email" type="email" />
      <Password name="password" label="Password" />
    </AuthForm>
  );
}

export default SignIn;
