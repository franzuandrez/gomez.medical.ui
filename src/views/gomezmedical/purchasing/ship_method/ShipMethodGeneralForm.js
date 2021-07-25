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
import apiShipMethods from '../../../../services/api/purchasing/apiShipMethods';
import { PATH_APP } from '../../../../routes/paths';


ShipMethodGeneralForm.propTypes = {
  ship_method: PropTypes.object,
  isEdit: PropTypes.bool
};

export default function ShipMethodGeneralForm({ ship_method, isEdit = false }) {

  const { enqueueSnackbar } = useSnackbar();
  const [isSaved, setIsSaved] = useState(false);
  const [shipMethodSaved, setShipMethodSaved] = useState(ship_method);
  const ShipMethodSchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: ship_method?.name || '',
    },
    validationSchema: ShipMethodSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {

        setSubmitting(true);
        let result;
        if (isEdit || isSaved) {
          result = await apiShipMethods.patch(values, shipMethodSaved.ship_method_id);
        } else {
          result = await apiShipMethods.post(values);
        }
        enqueueSnackbar(!isEdit ? 'Creado correctamente' : 'Actualizado correctamente', { variant: 'success' });

        setSubmitting(false);
        setIsSaved(true);
        setShipMethodSaved(result);


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
                        label='Nombre'
                        {...getFieldProps('name')}
                        value={values.name}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>

                  </Grid>
                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>

                    <Link
                      component={RouterLink}
                      to={`${PATH_APP.purchasing.ship_methods.root}`}>
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


    </Grid>
  );
}
