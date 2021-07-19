
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';

import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';


import {
  Box, Button,
  FormControl,
  FormHelperText,
  Link,
  TextField
} from '@material-ui/core';
import CategoriesSearchBox from '../categories/CategoriesSearchBox';
import { PATH_APP } from '../../../../routes/paths';
import apiSubcategories from '../../../../services/api/ecommerce/apiSubcategories';




export default function AddNewSubCategoryForm() {





  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();


  const SubcategorySchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido'),
    product_category_id: Yup.string().required('Seleccione Categoria')
  });


  const formik = useFormik({
    initialValues: {
      name: '',
      product_category_id: ''
    },
    validationSchema: SubcategorySchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {

        await apiSubcategories.post(values);

        resetForm();
        setSubmitting(false);
        history.push('/app/products/subcategories');

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
    getFieldProps,
    setFieldValue
  } = formik;



  return (

    <FormikProvider value={formik}>
      <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <FormControl
          fullWidth
          error={Boolean(touched.product_category_id && errors.product_category_id)}
        >

         <CategoriesSearchBox
           onChange={(event, newValue) => {
             setFieldValue('product_category_id', newValue.product_category_id, true);
           }}
           error={Boolean(touched.product_category_id && errors.product_category_id)}
           required
           getFieldProps={getFieldProps('product_category_id')}
         />

          <FormHelperText>  {touched.product_category_id && errors.product_category_id}</FormHelperText>
        </FormControl>

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
            to={`${PATH_APP.products.subcategories.root}`}>
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
