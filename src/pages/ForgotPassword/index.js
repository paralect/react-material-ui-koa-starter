import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Button, Typography } from '@material-ui/core';

import routes from 'routes';
import { useSubmit } from 'helpers/formik.helper';
import { userApi } from 'resources/user';
import AuthForm from 'components/AuthForm';
import AuthField from 'components/AuthField';

const ForgotView = {
  FORM: 'FORM',
  SUCCESS: 'SUCCESS',
};

function ForgotPassword() {
  const [view, setView] = useState(ForgotView.FORM);
  const [forgotPassword] = useMutation(userApi.forgot, {
    onSuccess: () => void setView(ForgotView.SUCCESS),
    onError: (error) => {
      throw error;
    },
  });
  const onSubmit = useSubmit(forgotPassword);

  switch (view) {
    case ForgotView.SUCCESS:
      return (
        <>
          <Typography component="h1" variant="h2" gutterBottom>
            Success!
          </Typography>
          <Typography variant="h5" align="center">
            Your password has been reset
            <br />
            Please check your email
          </Typography>
        </>
      );

    case ForgotView.FORM:
    default:
      return (
        <AuthForm
          initialValues={{ email: '' }}
          title="Password Reset"
          submitLabel="Reset"
          additionalActionLabel="Sign Up"
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
          <AuthField label="Email" name="email" type="email" autoFocus />
        </AuthForm>
      );
  }
}

export default ForgotPassword;
