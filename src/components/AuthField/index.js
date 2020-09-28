import React from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

function AuthField(props) {
  return <Field component={TextField} variant="filled" fullWidth {...props} />;
}

export default AuthField;
