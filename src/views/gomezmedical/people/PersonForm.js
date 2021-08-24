import PropTypes from 'prop-types';

import {
  Grid,
  TextField
} from '@material-ui/core';


PersonForm.propTypes = {
  formik: PropTypes.object
};

export default function PersonForm({ formik }) {

  const {
    values,
    errors,
    touched,
    getFieldProps
  } = formik;

  return (


    <>
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
    </>


  );
}
