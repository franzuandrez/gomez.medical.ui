import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
// material
import {
  Box,
  Grid,
  Card,
  Button,
  TextField,
  CardContent, FormControl, Link, CardHeader

} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';


import apiVendors from '../../../../services/api/people/apiVendors';
import { PATH_APP } from '../../../../routes/paths';


VendorGeneralForm.propTypes = {
  vendor: PropTypes.object,
  isEdit: PropTypes.bool,
};

export default function VendorGeneralForm({ vendor, isEdit = false }) {

  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const VendorSchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: vendor?.name || '',
      url_web: vendor?.url_web || ''

    },

    validationSchema: VendorSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setSubmitting(true);
        if (isEdit) {
          await apiVendors.patch(values, vendor.vendor_id);
        } else {
          await apiVendors.post(values);
        }
        enqueueSnackbar(!isEdit ? 'Creado correctamente' : 'Actualizado correctamente', { variant: 'success' });

        resetForm();
        setSubmitting(false);
        history.push(PATH_APP.people.vendors.root);

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
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Card>
              <CardHeader
                title='Información General'
              />
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

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label='Numero de cuenta'
                      {...getFieldProps('account_number')}
                      value={values.account_number}
                      error={Boolean(touched.account_number && errors.account_number)}
                      helperText={touched.account_number && errors.account_number}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl fullWidth>
                      <TextField
                        fullWidth
                        label='Web'
                        {...getFieldProps('url_web')}
                        value={values.url_web}
                      />
                    </FormControl>
                  </Grid>

                </Grid>
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>

                  <Link
                    component={RouterLink}
                    to={`${PATH_APP.people.vendors.root}`}>
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
            </Card>
          </Grid>

        </Grid>
      </Form>
    </FormikProvider>
  );
}
