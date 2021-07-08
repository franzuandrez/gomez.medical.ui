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
import apiWarehouses from '../../../../services/api/locations/apiWarehouses';
import apiSections from '../../../../services/api/locations/apiSections';
import apiCorridors from '../../../../services/api/locations/apiCorridors';
import apiRacks from '../../../../services/api/locations/apiRacks';
import apiLevels from '../../../../services/api/locations/apiLevels';
import apiBins from '../../../../services/api/locations/apiBins';


export default function EditBinForm() {

  const { binId } = useParams();


  const { enqueueSnackbar } = useSnackbar();


  const BinSchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido'),
    section_id: Yup.string().required('Seleccione Sector'),
    warehouse_id: Yup.string().required('Seleccione Bodega'),
    corridor_id: Yup.string().required('Seleccione Pasillo'),
    rack_id: Yup.string().required('Seleccione Rack'),
    level_id: Yup.string().required('Seleccione Nivel'),
    position_id: Yup.string().required('Seleccione Posicion')

  });
  const formik = useFormik({
    initialValues: {
      name: '',
      section_id: '',
      warehouse_id: '',
      corridor_id: '',
      rack_id: '',
      level_id: '',
      position_id: ''
    },
    validationSchema: BinSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {

        const result = await apiBins.patch(values, binId);

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
    setFieldValue('level_id', '', true);
    setFieldValue('position_id', '', true);
    apiWarehouses.nested(event.target.value).then((res) => {
      setSections(res);
    });

  };
  const handleChangeSection = (event) => {

    setFieldValue('section_id', event.target.value, true);
    setFieldValue('corridor_id', '', true);
    setFieldValue('rack_id', '', true);
    setFieldValue('level_id', '', true);
    setFieldValue('position_id', '', true);
    apiSections.nested(event.target.value).then((res) => {
      setCorridors(res);
    });
  };
  const handleChangeCorridor = (event) => {

    setFieldValue('corridor_id', event.target.value, true);
    setFieldValue('rack_id', '', true);
    setFieldValue('level_id', '', true);
    setFieldValue('position_id', '', true);
    apiCorridors.nested(event.target.value).then((res) => {
      setRacks(res);
    });

  };
  const handleChangeRack = (event) => {

    setFieldValue('rack_id', event.target.value, true);
    setFieldValue('level_id', '', true);
    setFieldValue('position_id', '', true);
    apiRacks.nested(event.target.value).then((res) => {
      setLevels(res);
    });
  };

  const handleChangeLevel = (event) => {
    setFieldValue('level_id', event.target.value, true);
    setFieldValue('position_id', '', true);
    apiLevels.nested(event.target.value).then((res) => {
      setPositions(res);
    });
  };
  const handleChangePosition = (event) => {
    setFieldValue('position_id', event.target.value, true);

  };
  const [sections, setSections] = useState([]);
  const [corridors, setCorridors] = useState([]);
  const [racks, setRacks] = useState([]);
  const [levels, setLevels] = useState([]);
  const [positions, setPositions] = useState([]);

  const { data: warehouses } = useQuery('warehouses', apiWarehouses.getAll);

  const { status: levelStatus } = useQuery(['bins', binId],
    async () => {

      const bin = await apiBins.getSingle(binId);
      const sections = await apiWarehouses.nested(bin.position.level.rack.corridor.section.warehouse.warehouse_id);
      const corridors = await apiSections.nested(bin.position.level.rack.corridor.section.section_id);
      const racks = await apiCorridors.nested(bin.position.level.rack.corridor.corridor_id);
      const levels = await apiRacks.nested(bin.position.level.rack.rack_id);
      const positions = await apiLevels.nested(bin.position.level.level_id);
      setSections(sections);
      setCorridors(corridors);
      setRacks(racks);
      setLevels(levels);
      setPositions(positions);

      setFieldValue('position_id', bin.position.position_id, true);
      setFieldValue('level_id', bin.position.level.level_id, true);
      setFieldValue('rack_id', bin.position.level.rack.rack_id, true);
      setFieldValue('corridor_id', bin.position.level.rack.corridor.corridor_id, true);
      setFieldValue('section_id', bin.position.level.rack.corridor.section.section_id, true);
      setFieldValue('warehouse_id', bin.position.level.rack.corridor.section.warehouse.warehouse_id, true);
      setFieldValue('name', bin.position.name, true);
    }
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });


  return (

    <Page title='Bin: Editar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Editar  Bin'
          links={[
            { name: 'Bines', href: PATH_APP.locations.bins.root },
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
                <FormControl
                  fullWidth
                  error={Boolean(touched.level_id && errors.level_id)}
                >
                  <InputLabel>Nivel</InputLabel>
                  <Select
                    required
                    fullWidth
                    sx={{ mb: 3 }}
                    {...getFieldProps('level_id')}
                    onChange={handleChangeLevel}
                  >
                    {
                      levels && levels.map(level =>
                        <MenuItem key={`level-${level.level_id}`} value={level.level_id}>
                          {level.name}
                        </MenuItem>
                      )
                    }
                  </Select>
                  <FormHelperText>  {touched.level_id && errors.level_id}</FormHelperText>
                </FormControl>
                <FormControl
                  fullWidth
                  error={Boolean(touched.position_id && errors.position_id)}
                >
                  <InputLabel>Posicion</InputLabel>
                  <Select
                    required
                    fullWidth
                    sx={{ mb: 3 }}
                    {...getFieldProps('position_id')}
                    onChange={handleChangePosition}
                  >
                    {
                      positions && positions.map(position =>
                        <MenuItem key={`position-${position.position_id}`} value={position.position_id}>
                          {position.name}
                        </MenuItem>
                      )
                    }
                  </Select>
                  <FormHelperText>  {touched.position_id && errors.position_id}</FormHelperText>
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
