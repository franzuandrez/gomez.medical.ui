import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  Button,
  TextField,
  CardContent, Link, Stack, CardHeader

} from '@material-ui/core';

import { LoadingButton } from '@material-ui/lab';
import apiCustomers from '../../../../services/api/people/apiCustomers';
import { PATH_APP } from '../../../../routes/paths';
import PhoneNumbers from '../../business_entity/PhoneNumbers';
import Addresses from '../../business_entity/Addresses';


CustomerGeneralForm.propTypes = {
  customer: PropTypes.object,
  isEdit: PropTypes.bool
};

export default function CustomerGeneralForm({ customer, isEdit = false }) {

  const { enqueueSnackbar } = useSnackbar();
  const [isSaved, setIsSaved] = useState(false);
  const [customerSaved, setCustomerSaved] = useState(customer);
  const CustomerSchema = Yup.object().shape({
    nit: Yup.string().required('Nit requerido'),
    first_name: Yup.string().required('Primer nombre requerido'),
    last_name: Yup.string().required('Apellido requerido')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nit: customer?.nit || '',
      first_name: customer?.person?.first_name || '',
      middle_name: customer?.person?.middle_name || '',
      last_name: customer?.person?.last_name || '',
      title: customer?.person?.title || '',
      suffix: customer?.person?.suffix || ''

    },

    validationSchema: CustomerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {

        setSubmitting(true);
        let result;
        if (isEdit || isSaved) {
          result = await apiCustomers.patch(values, customerSaved.customer_id);
        } else {
          result = await apiCustomers.post(values);
        }
        enqueueSnackbar(!isEdit ? 'Creado correctamente' : 'Actualizado correctamente', { variant: 'success' });

        setSubmitting(false);
        setIsSaved(true);
        setCustomerSaved(result);


      } catch (error) {
        setSubmitting(false);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps

  } = formik;

  return (
    <Grid container spacing={2}>

      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader
            title='Información General'
          />

          <FormikProvider value={formik}>
            <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='NIT'
                        {...getFieldProps('nit')}
                        value={values.nit}
                        error={Boolean(touched.nit && errors.nit)}
                        helperText={touched.nit && errors.nit}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Primer nombre'
                        {...getFieldProps('first_name')}
                        value={values.first_name}
                        error={Boolean(touched.first_name && errors.first_name)}
                        helperText={touched.first_name && errors.first_name}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Segundo nombre'
                        {...getFieldProps('middle_name')}
                        value={values.middle_name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Apellido'
                        {...getFieldProps('last_name')}
                        value={values.last_name}
                        error={Boolean(touched.last_name && errors.last_name)}
                        helperText={touched.last_name && errors.last_name}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Titulo'
                        {...getFieldProps('title')}
                        value={values.title}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Sufijo'
                        {...getFieldProps('suffix')}
                        value={values.suffix}
                      />
                    </Grid>

                  </Grid>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>

                    <Link
                      component={RouterLink}
                      to={`${PATH_APP.people.customers.root}`}>
                      <Button
                        type='button'
                        color='inherit'
                        variant='outlined'
                        sx={{ mr: 1.5 }}
                      >
                        Cancelar
                      </Button>
                    </Link>

                    <LoadingButton
                      type='submit'
                      variant='contained'
                      color='primary'
                      pending={isSubmitting}
                    >
                      Guardar
                    </LoadingButton>
                  </Box>
                </CardContent>
              </Stack>

            </Form>

          </FormikProvider>
        </Card>
      </Grid>

      {
        (isSaved || isEdit) &&
        <>
          <Grid item xs={12} md={12}>
            <Addresses
              businessEntity={customerSaved?.business_entity}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <PhoneNumbers
              businessEntity={customerSaved?.business_entity}
            />
          </Grid>
        </>
      }

    </Grid>
  );
}
