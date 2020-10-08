import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import routes from 'routes';
import { useSubmit } from 'helpers/formik.helper';
import { useSignUp } from 'resources/user';
import AuthForm from 'components/AuthForm';
import FormField from 'components/FormField';

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
      <FormField name="firstName" label="First Name" />
      <FormField name="lastName" label="Last Name" />
      <FormField name="email" label="Email" type="email" />
      <FormField name="password" label="Password" type="password" />
    </AuthForm>
  );
}

export default SignUp;
