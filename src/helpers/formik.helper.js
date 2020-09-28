import { useSnackbar } from 'notistack';
import uniq from 'lodash/uniq';
import intersection from 'lodash/intersection';
import pick from 'lodash/pick';

export function generateEmail() {
  return `${Math.random().toString(36).substr(2, 5)}@bluebanc.com`;
}

function formatErrors(errors) {
  return Object.entries(errors).reduce(
    (acc, [field, message]) => ({ ...acc, [field]: uniq(message).join(', ') }),
    {}
  );
}

export function useHandleFormikError() {
  const { enqueueSnackbar } = useSnackbar();

  return (e, formik) => {
    const formErrors = formatErrors(e.data.errors);
    const { _global: globalError } = formErrors;

    if (globalError) {
      enqueueSnackbar(globalError, {
        variant: 'error',
      });
    }

    formik.setErrors(formErrors);
    formik.setSubmitting(false);
  };
}

export function useSubmit(submitFn) {
  const handleFormikError = useHandleFormikError();

  return async (values, formik) => {
    try {
      await submitFn(values);
    } catch (e) {
      handleFormikError(e, formik);
    }
  };
}

export const validatePartialHandler = (fields, formik) => async () => {
  fields.forEach((name) => formik.setFieldTouched(name, true));
  const errors = await formik.validateForm();

  return intersection(Object.keys(errors), fields).length === 0;
};

export function prepareValues(
  formData,
  fieldsToNormalize = [],
  unexpectedSymbolExp = /\s/g
) {
  const valuesToNormalize = pick(formData, fieldsToNormalize);
  const normalizedValues = Object.entries(valuesToNormalize).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value.replace(unexpectedSymbolExp, ''),
    }),
    {}
  );

  return { ...formData, ...normalizedValues };
}
