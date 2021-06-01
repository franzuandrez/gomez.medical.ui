import * as Yup from 'yup';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { Container, TextField } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { LoadingButton } from '@material-ui/lab';
import { FormikProvider, useFormik } from 'formik';
// routes
import { PATH_APP } from '../../../../routes/paths';
// components
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';

import { addNewWarehouse } from '../../../../redux/slices/warehouseSlice';



export default function NewWarehouse() {


  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [addRequestStatus, setAddRequestStatus] = useState('idle');


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
        setAddRequestStatus('pending');

        const resultAction = await dispatch(
          addNewWarehouse(values)
        );
        unwrapResult(resultAction)
        resetForm();
        setSubmitting(false);
        history.push('/app/locations/warehouses');

      } catch (error) {
        setSubmitting(false);
        setErrors({ afterSubmit: error.message });
        enqueueSnackbar(error.message, { variant: 'error' });
      }finally {
        setAddRequestStatus('idle')
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
    <Page title='Bodega: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nueva  Bodega'
          links={[
            { name: 'Bodegas', href: PATH_APP.locations.warehouses.root },
            { name: 'Crear' }
          ]}

        />

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

      </Container>
    </Page>
  );
}
