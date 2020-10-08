import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';

function FormField(props) {
  const id = props.name;

  return (
    <Field
      component={TextField}
      id={id}
      variant="filled"
      InputLabelProps={{}}
      fullWidth
      {...props}
    />
  );
}

FormField.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormField;
