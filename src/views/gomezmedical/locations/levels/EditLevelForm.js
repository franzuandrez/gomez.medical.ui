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
import apiLevels from '../../../../services/api/levels/apiLevels';
import apiCorridors from '../../../../services/api/corridors/apiCorridors';
import apiSections from '../../../../services/api/sections/apiSections';
import apiWarehouses from '../../../../services/api/warehouses/apiWarehouses';


export default function EditLevelForm() {

  const { levelId } = useParams();


  const { enqueueSnackbar } = useSnackbar();


  const LevelSchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido'),
    section_id: Yup.string().required('Seleccione Sector'),
    warehouse_id: Yup.string().required('Seleccione Bodega'),
    corridor_id: Yup.string().required('Seleccione Pasillo'),
    rack_id: Yup.string().required('Seleccione Rack')
  });


  const formik = useFormik({
    initialValues: {
      name: '',
      section_id: '',
      warehouse_id: '',
      corridor_id: '',
      rack_id: ''
    },
    validationSchema: LevelSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {

        const result = await apiLevels.patch(values, levelId);

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
    setFieldValue('corridor_id', '', true);
    setFieldValue('rack_id', '', true);
    apiWarehouses.nested(event.target.value).then((res) => {
      setSections(res);
    });

  };
  const handleChangeSection = (event) => {

    setFieldValue('section_id', event.target.value, true);
    setFieldValue('corridor_id', '', true);
    setFieldValue('rack_id', '', true);
    apiSections.nested(event.target.value).then((res) => {
      setCorridors(res);
    });
  };
  const handleChangeCorridor = (event) => {

    setFieldValue('corridor_id', event.target.value, true);
    setFieldValue('rack_id', '', true);
    apiCorridors.nested(event.target.value).then((res) => {
      setRacks(res);
    });

  };
  const handleChangeRack = (event) => {
    setFieldValue('rack_id', event.target.value, true);
  };

  const [sections, setSections] = useState([]);
  const [corridors, setCorridors] = useState([]);
  const [racks, setRacks] = useState([]);

  const { data: warehouses } = useQuery('warehouses', apiWarehouses.getAll);

  const { status: levelStatus } = useQuery(['level', levelId],
    async () => {

      const level = await apiLevels.getSingle(levelId);
      const sections = await apiWarehouses.nested(level.rack.corridor.section.warehouse.warehouse_id);
      const corridors = await apiSections.nested(level.rack.corridor.section.section_id);
      const racks = await apiCorridors.nested(level.rack.corridor.corridor_id);
      setSections(sections);
      setCorridors(corridors);
      setRacks(racks);

      setFieldValue('rack_id', level.rack.rack_id, true);
      setFieldValue('corridor_id', level.rack.corridor.corridor_id, true);
      setFieldValue('section_id', level.rack.corridor.section.section_id, true);
      setFieldValue('warehouse_id', level.rack.corridor.section.warehouse.warehouse_id, true);
      setFieldValue('name', level.name, true);
    }
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });


  return (

    <Page title='Level: Editar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Editar  Nivel'
          links={[
            { name: 'Niveles', href: PATH_APP.locations.levels.root },
            { name: 'Editar' }
          ]}

        />

        <Card>
          <CardContent>
            <FormikProvider value={formik}>

              <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
                {levelStatus === 'loading' && <LoadingScreen />}
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

                <FormControl
                  fullWidth
                  error={Boolean(touched.corridor_id && errors.corridor_id)}
                >
                  <InputLabel>Pasillo</InputLabel>
                  <Select
                    required
                    fullWidth
                    sx={{ mb: 3 }}

                    {...getFieldProps('corridor_id')}
                    onChange={handleChangeCorridor}
                  >
                    {
                      corridors && corridors.map(corridor =>
                        <MenuItem key={`corridor-${corridor.corridor_id}`} value={corridor.corridor_id}>
                          {corridor.name}
                        </MenuItem>
                      )
                    }
                  </Select>
                  <FormHelperText>  {touched.corridor_id && errors.corridor_id}</FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  error={Boolean(touched.rack_id && errors.rack_id)}
                >
                  <InputLabel>Rack</InputLabel>
                  <Select
                    required
                    fullWidth
                    sx={{ mb: 3 }}
                    {...getFieldProps('rack_id')}
                    onChange={handleChangeRack}
                  >
                    {
                      racks && racks.map(rack =>
                        <MenuItem key={`rack-${rack.rack_id}`} value={rack.rack_id}>
                          {rack.name}
                        </MenuItem>
                      )
                    }
                  </Select>
                  <FormHelperText>  {touched.rack_id && errors.rack_id}</FormHelperText>
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
