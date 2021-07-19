import { useSnackbar } from 'notistack';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Button, Card, CardContent,
  Container,
  Link,
  TextField
} from '@material-ui/core';

import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import { PATH_APP } from '../../../../routes/paths';
import LoadingScreen from '../../../../components/LoadingScreen';
import apiCategories from '../../../../services/api/ecommerce/apiCategories';



export default function EditCategoryForm() {

  const { categoryId } = useParams();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();


  const CategorySchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido'),
  });


  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: CategorySchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {

        const result = await apiCategories.patch(values, categoryId);

        if (result.status) {
          enqueueSnackbar(result.data.message, { variant: 'error' });
        } else {
          enqueueSnackbar('Guardado correctamente', { variant: 'success' });
        }
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
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;







  const { status: categoryStatus } = useQuery(['category', categoryId],
    async () => {

      const category = await apiCategories.getSingle(categoryId);

      setFieldValue('name', category.name, true);

    }
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });


  return (

    <Page title='Categoria: Editar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Editar  Categoria'
          links={[
            { name: 'Categorias', href: PATH_APP.products.categories.root },
            { name: 'Editar' }
          ]}

        />

        <Card>
          <CardContent>
            <FormikProvider value={formik}>

              <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
                {categoryStatus === 'loading' && <LoadingScreen />}
                <TextField
                  label='Nombre'
                  variant='outlined'
                  color='primary'
                  fullWidth
                  required
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
          </CardContent>
        </Card>
      </Container>
    </Page>
  );


};
