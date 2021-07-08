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
import apiCorridors from '../../../../services/api/locations/apiCorridors';
import apiWarehouses from '../../../../services/api/locations/apiWarehouses';


export default function EditCorridorForm() {

  const { corridorId } = useParams();

  const { enqueueSnackbar } = useSnackbar();


  const CorridorSchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido'),
    section_id: Yup.string().required('Seleccione Sector'),
    warehouse_id: Yup.string().required('Seleccione Bodega')
  });


  const formik = useFormik({
    initialValues: {
      name: '',
      section_id: '',
      warehouse_id: ''
    },
    validationSchema: CorridorSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {

        const result = await apiCorridors.patch(values, corridorId);

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


  const handleChangeWarehouse = (event) => {

    setFieldValue('warehouse_id', event.target.value, true);
    setFieldValue('section_id', '', true);
    apiWarehouses.nested(event.target.value).then((res) => {
      setSections(res);
    });
  };
  const handleChangeSection = (event) => {

    setFieldValue('section_id', event.target.value, true);
  };



  const [sections, setSections] = useState([]);

  const { data: warehouses } = useQuery('warehouses', apiWarehouses.getAll);

  const { status: corridorStatus } = useQuery(['corridor', corridorId],
    async () => {

      const corridor = await apiCorridors.getSingle(corridorId);
      const sections = await apiWarehouses.nested(corridor.section.warehouse.warehouse_id);
      setSections(sections);

      setFieldValue('section_id', corridor.section.section_id, true);
      setFieldValue('name', corridor.name, true);
      setFieldValue('warehouse_id', corridor.section.warehouse.warehouse_id, true);
    }
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });


  return (

    <Page title='Bodega: Pasillo | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Editar  Pasillo'
          links={[
            { name: 'Pasillos', href: PATH_APP.locations.corridors.root },
            { name: 'Editar' }
          ]}

        />

        <Card>
          <CardContent>
            <FormikProvider value={formik}>

              <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
                {corridorStatus === 'loading' && <LoadingScreen />}
                <FormControl
                  fullWidth
                  error={Boolean(touched.warehouse_id && errors.warehouse_id)}
                >
                  <InputLabel>Bodega</InputLabel>
                  <Select
                    required
                    fullWidth
                    sx={{ mb: 3 }}

                    {...getFieldProps('warehouse_id')}
                    onChange={handleChangeWarehouse}
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
                <FormControl
                  fullWidth
                  error={Boolean(touched.section_id && errors.section_id)}
                >
                  <InputLabel>Sector</InputLabel>
                  <Select
                    required
                    fullWidth
                    sx={{ mb: 3 }}
                    {...getFieldProps('section_id')}
                    onChange={handleChangeSection}
                  >
                    {
                      sections && sections.map(section =>
                        <MenuItem key={`section-${section.section_id}`} value={section.section_id}>
                          {section.name}
                        </MenuItem>
                      )
                    }
                  </Select>
                  <FormHelperText>  {touched.section_id && errors.section_id}</FormHelperText>
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
