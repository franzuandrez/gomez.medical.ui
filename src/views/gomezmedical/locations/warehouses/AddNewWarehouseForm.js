import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import { LoadingButton } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { addNewWarehouse } from '../../../../redux/slices/warehouseSlice';

export default function AddNewWarehouseForm() {


  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();


  const dispatch = useDispatch();

  const WarehouseSchema = Yup.object().shape({
    name: Yup.string()
      .required('Nombre requerido')
  });


  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: WarehouseSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {

        const resultAction = await dispatch(
          addNewWarehouse(values)
        );
        unwrapResult(resultAction);
        resetForm();
        setSubmitting(false);
        history.push('/app/locations/warehouses');

      } catch (error) {
        setSubmitting(false);
        setErrors({ afterSubmit: error.message });
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  });
  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps
  } = formik;


  return (

    <FormikProvider value={formik}>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          label='Nombre'
          variant='outlined'
          color='primary'
          fullWidth
          required
          value={values.name}
          {...getFieldProps('name')}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}

        />

        <LoadingButton
          type='submit'
          variant='contained'
          color='primary'
          pending={isSubmitting}
        >
          Guardar
        </LoadingButton>
      </form>
    </FormikProvider>

  );
}
