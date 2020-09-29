import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import routes from 'routes';
import { useSubmit } from 'helpers/formik.helper';
import { useSignUp } from 'resources/user';
import AuthForm from 'components/AuthForm';
import AuthField from 'components/AuthField';

function SignUp() {
  const [signUp] = useSignUp();
  const onSubmit = useSubmit(signUp);

  return (
    <AuthForm
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      }}
      title="Sign Up"
      submitLabel="Sign Up"
      onSubmit={onSubmit}
      additionalAction={
        <Button
          component={Link}
          to={routes.signIn.path}
          color="primary"
          fullWidth
        >
          Sign In
        </Button>
      }
    >
      <AuthField label="First Name" name="firstName" />
      <AuthField label="Last Name" name="lastName" />
      <AuthField label="Email" name="email" type="email" />
      <AuthField label="Password" name="password" type="password" />
    </AuthForm>
  );
}

export default SignUp;
