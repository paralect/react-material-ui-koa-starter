import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { Box, Button, Divider, Typography } from '@material-ui/core';

import Logo from 'components/Logo';

const useStyles = makeStyles((theme) => ({
  container: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(3),
    },
  },
  btnContainer: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
}));

function AuthForm({
  children,
  initialValues,
  title,
  onSubmit,
  submitLabel,
  additionalAction,
}) {
  const classes = useStyles();

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Box
          className={classes.container}
          component={Form}
          display="flex"
          flexDirection="column"
          alignSelf="center"
          alignItems="center"
          justifyContent="center"
          width={320}
          maxWidth="90%"
        >
          <Logo />

          <Divider width="100%" />

          <Typography component="h1" variant="h4" align="center">
            {title}
          </Typography>

          {children}

          <Box className={classes.btnContainer} width={1}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              {submitLabel}
            </Button>

            {additionalAction}
          </Box>
        </Box>
      )}
    </Formik>
  );
}

AuthForm.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  submitLabel: PropTypes.node.isRequired,
  additionalAction: PropTypes.node,
};

AuthForm.defaultProps = {
  additionalAction: null,
};

export default AuthForm;
