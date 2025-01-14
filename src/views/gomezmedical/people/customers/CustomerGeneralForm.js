import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Grid,
  Card,
  Button,
  TextField,
  CardContent, Link, Stack, CardHeader, FormControlLabel, Switch

} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

import apiCustomers from '../../../../services/api/people/apiCustomers';
import { PATH_APP } from '../../../../routes/paths';
import PhoneNumbers from '../../business_entity/PhoneNumbers';
import Addresses from '../../business_entity/Addresses';
import { addCustomer } from '../../../../redux/slices/customer';
import PersonForm from '../PersonForm';


CustomerGeneralForm.propTypes = {
  customer: PropTypes.object,
  isEdit: PropTypes.bool,
  redirectBack: PropTypes.bool
};

export default function CustomerGeneralForm({
                                              customer,
                                              isEdit = false,
                                              redirectBack = false,
                                              openWithMinimalInformation = false
                                            }) {

  const { enqueueSnackbar } = useSnackbar();
  const [isSaved, setIsSaved] = useState(false);
  const [customerSaved, setCustomerSaved] = useState(customer);
  const [isBusinessName, setIsBusinessName] = useState(false);
  const dispatch = useDispatch();

  function is_a_valid_nit(nit = '') {


    const nit_without_hyphen = nit.replace('-', '').toUpperCase();
    if (nit_without_hyphen==='CF'){
      return true;
    }
    const nit_length = nit_without_hyphen.length;
    const check_digit = nit_without_hyphen[nit_length - 1];

    const sum = nit_without_hyphen.slice(0, nit_length - 1)
      .split('')
      .reverse()
      .reduce((accum, current, currentIndex) => accum + current * (currentIndex + 2), 0);
    const result = sum % 11;
    const real_check_digit = (11 - result).toString();

    return (((real_check_digit === '10' && check_digit === 'K') || real_check_digit === check_digit) && nit_length===8) ;


  }


  const CustomerSchema = Yup.object().shape({
    showBusinessNameOption: Yup.boolean(),
    nit: Yup.string()
      .required('Nit requerido').test('valid-nit', 'Nit invalido', async value => (await is_a_valid_nit(value) === true)),
    first_name:
      Yup.string()
        .when('showBusinessNameOption', {
          is: false,
          then: Yup.string().required('Primer nombre requerido')
        }),
    last_name: Yup.string()
      .when('showBusinessNameOption', {
        is: false,
        then: Yup.string().required('Apellido requerido')
      }),
    business_name: Yup.string()
      .when('showBusinessNameOption', {
        is: true,
        then: Yup.string().required('Nombre Comercial requerido')
      })
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nit: customer?.nit || 'CF',
      first_name: customer?.person?.first_name || '',
      middle_name: customer?.person?.middle_name || '',
      business_name: customer?.business_name || customer?.person?.first_name || '',
      last_name: customer?.person?.last_name || '',
      title: customer?.person?.title || '',
      suffix: customer?.person?.suffix || '',
      showBusinessNameOption: isBusinessName
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
        dispatch(addCustomer(result));

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
                    <Grid item xs={12}>

                      <FormControlLabel
                        onChange={() =>
                          setIsBusinessName(!isBusinessName)
                        }
                        control={<Switch />} label='Empresa' />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='NIT'
                        autoFocus
                        {...getFieldProps('nit')}
                        value={values.nit}
                        error={Boolean(touched.nit && errors.nit)}
                        helperText={touched.nit && errors.nit}
                      />
                    </Grid>
                    {(isBusinessName) ? (
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Empresa'
                          {...getFieldProps('business_name')}
                          value={values.business_name}
                          error={Boolean(touched.business_name && errors.business_name)}
                          helperText={touched.business_name && errors.business_name}
                        />
                      </Grid>) : (
                      <PersonForm formik={formik}  openWithMinimalInformation={openWithMinimalInformation}/>
                    )
                    }


                  </Grid>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>

                    {redirectBack &&
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
                    }

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
              businessEntity={customerSaved?.business_entity} openWithMinimalInformation={openWithMinimalInformation}
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
