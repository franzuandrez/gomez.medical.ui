import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';

import {
  Box, Button,
  Link,
  TextField
} from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';

import apiCategories from '../../../../services/api/categories/apiCategories';


export default function AddNewCategoryForm() {


  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();


  const CategorySchema = Yup.object().shape({
    name: Yup.string().required('Nombre  requerido')
  });


  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: CategorySchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {

        await apiCategories.post(values);

        resetForm();
        setSubmitting(false);
        history.push('/app/products/categories');

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
      <Form noValidate autoComplete='off' onSubmit={handleSubmit}>

        <TextField
          label='Nombre'
          variant='outlined'
          color='primary'
          fullWidth
          sx={{ mb: 3 }}
          required
          value={values.name}
          {...getFieldProps('name')}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
        />

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>

          <Link
            component={RouterLink}
            to={`${PATH_APP.products.categories.root}`}>
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
      </Form>

    </FormikProvider>

  )
    ;
}
