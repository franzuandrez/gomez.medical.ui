import { useSnackbar } from 'notistack';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Button, Card, CardContent,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  TextField
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import { PATH_APP } from '../../../../routes/paths';
import LoadingScreen from '../../../../components/LoadingScreen';
import apiSections from '../../../../services/api/sections/apiSections';
import apiWarehouses from '../../../../services/api/warehouses/apiWarehouses';


export default function EditSectionForm() {

  const { sectionId } = useParams();

  const { enqueueSnackbar } = useSnackbar();


  const SectionSchema = Yup.object().shape({
    name: Yup.string()
      .required('Nombre requerido'),
    warehouse_id: Yup.string().required('Seleccione Bodega')
  });


  const formik = useFormik({
    initialValues: {
      warehouse_id: '',
      name: ''
    },
    validationSchema: SectionSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {

        const result = await apiSections.patch(values, sectionId);

        if (result.status) {
          enqueueSnackbar(result.data.message, { variant: 'error' });
        } else {
          enqueueSnackbar('Guardado correctamente', { variant: 'success' });
        }
        setSubmitting(false);


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


  const handleChange = (event) => {

    setFieldValue('warehouse_id', event.target.value, true);
  };
  const [warehouseId, setWarehouseId] = useState('');
  const { data: warehouses } = useQuery('warehouses', apiWarehouses.getAll);

  const { status: sectionStatus } = useQuery(['sections', sectionId],
    async () => {
      const data = await apiSections.getSingle(sectionId);


      setFieldValue('name', data.name, true);
      setFieldValue('warehouse_id', data.warehouse.warehouse_id, true);
      setWarehouseId(data.warehouse.warehouse_id);

    }
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });

  return (

    <Page title='Bodega: Sector | Gomez-Medical'>
      <Container>

        <HeaderDashboard
          heading='Editar  Sector'
          links={[
            { name: 'Sectores', href: PATH_APP.locations.sections.root },
            { name: 'Editar' }
          ]}

        />

        <Card>
          <CardContent>
            <FormikProvider value={formik}>


              <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
                {sectionStatus === 'loading' && <LoadingScreen />}
                <FormControl
                  fullWidth
                  error={Boolean(touched.warehouse_id && errors.warehouse_id)}
                >
                  <InputLabel>Bodega</InputLabel>
                  <Select
                    required
                    fullWidth
                    sx={{ mb: 3 }}
                    value={warehouseId}
                    defaultValue=''
                    {...getFieldProps('warehouse_id')}
                    onChange={handleChange}
                  >
                    {
                      warehouses && warehouses.map(warehouse =>
                        <MenuItem key={`warehouse-${warehouse.warehouse_id}`} value={warehouse.warehouse_id}>
                          {warehouse.name}
                        </MenuItem>
                      )
                    }
                  </Select>
                  <FormHelperText>  {touched.warehouse_id && errors.warehouse_id}</FormHelperText>
                </FormControl>

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
                    to={`${PATH_APP.locations.sections.root}`}>
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
