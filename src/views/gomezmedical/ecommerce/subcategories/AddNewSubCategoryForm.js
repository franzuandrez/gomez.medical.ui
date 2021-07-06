import { useState } from 'react';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';

import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';

import Autocomplete from '@material-ui/core/Autocomplete';

import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';


import {
  Box, Button,
  FormControl,
  FormHelperText, InputAdornment,
  Link,
  TextField
} from '@material-ui/core';
import SearchNotFound from '../../../../components/SearchNotFound';
import { PATH_APP } from '../../../../routes/paths';
import apiSubcategories from '../../../../services/api/subcategories/apiSubcategories';

import apiCategories from '../../../../services/api/categories/apiCategories';


export default function AddNewSubCategoryForm() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeSearch = async (event) => {
    try {
      const { value } = event.target;
      setSearchQuery(value);
      if (value) {
        const response = await apiCategories.getAll(`page=1&query=${value}`);
        const categories = response.data;
        setOptions(Object.keys(categories).map((key) => categories[key]));
      } else {
        setOptions([])
      }
    } catch (error) {
      console.error(error);
    }
  };






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

          <Autocomplete
            id='asynchronous-demo'
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            onChange={(event, newValue) => {
              setFieldValue('product_category_id', newValue.product_category_id, true);
            }}
            noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
            onInputChange={handleChangeSearch}
            getOptionSelected={(option, value) => option.product_category_id === value.product_category_id}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                {...getFieldProps('product_category_id')}
                error={Boolean(touched.product_category_id && errors.product_category_id)}
                placeholder='Categoria'
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <InputAdornment position='start'>
                        <Box
                          component={Icon}
                          icon={searchFill}
                          sx={{
                            ml: 1,
                            width: 20,
                            height: 20,
                            color: 'text.disabled'
                          }}
                        />
                      </InputAdornment>
                      {params.InputProps.startAdornment}
                    </>
                  )
                }}
              />
            )}
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
