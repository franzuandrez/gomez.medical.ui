import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Grid,
  Card,
  Button,
  TextField,
  CardContent, FormControl, Link, CardHeader

} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { PATH_APP } from '../../../../routes/paths';


VendorGeneralForm.propTypes = {
  formik: PropTypes.object
};

export default function VendorGeneralForm({ formik }) {


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
