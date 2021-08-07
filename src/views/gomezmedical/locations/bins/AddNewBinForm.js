import { useState } from 'react';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';
import { useQuery } from 'react-query';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import Select from '@material-ui/core/Select';
import {
  Box, Button,
  FormControl,
  FormHelperText,
  InputLabel, Link,
  MenuItem,
  TextField
} from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';


import apiWarehouses from '../../../../services/api/locations/apiWarehouses';
import apiSections from '../../../../services/api/locations/apiSections';
import apiCorridors from '../../../../services/api/locations/apiCorridors';
import apiRacks from '../../../../services/api/locations/apiRacks';
import apiLevels from '../../../../services/api/locations/apiLevels';
import apiBins from '../../../../services/api/locations/apiBins';


export default function AddNewBinForm() {

  const { data: warehouses } = useQuery('warehouses', apiWarehouses.getAll);
  const [sections, setSections] = useState([]);
  const [corridors, setCorridors] = useState([]);
  const [racks, setRacks] = useState([]);
  const [levels, setLevels] = useState([]);
  const [positions, setPositions] = useState([]);


  const history = useHistory();
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
    enableReinitialize: true,
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
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {

        await apiBins.post(values);

        resetForm();
        setSubmitting(false);
        history.push('/app/locations/bins');

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

  const handleChangeWarehouse = (event, newValue) => {

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

  const handleChangeCorridor = (event, newValue) => {

    setFieldValue('corridor_id', event.target.value, true);
    setFieldValue('rack_id', '', true);
    setFieldValue('level_id', '', true);
    setFieldValue('position_id', '', true);
    apiCorridors.nested(event.target.value).then((res) => {
      setRacks(res);
    });

    setFieldValue('name', `${values.name}${newValue.props.children}`);
  };
  const handleChangeRack = (event, newValue) => {

    setFieldValue('rack_id', event.target.value, true);
    setFieldValue('level_id', '', true);
    setFieldValue('position_id', '', true);
    apiRacks.nested(event.target.value).then((res) => {
      setLevels(res);
    });

    setFieldValue('name', `${values.name}${newValue.props.children}`);  };

  const handleChangeLevel = (event, newValue) => {
    setFieldValue('level_id', event.target.value, true);
    setFieldValue('position_id', '', true);
    apiLevels.nested(event.target.value).then((res) => {
      setPositions(res);
    });

    setFieldValue('name', `${values.name}${newValue.props.children}`);
  };
  const handleChangePosition = async (event, newValue) => {
    setFieldValue('position_id', event.target.value, true);

    setFieldValue('name', `${values.name}${newValue.props.children}`);
  };

  return (

    <FormikProvider value={formik}>
      <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <FormControl
          fullWidth
          error={Boolean(touched.warehouse_id && errors.warehouse_id)}
        >
          <InputLabel>Bodega</InputLabel>
          <Select
            required
            fullWidth
            sx={{ mb: 3 }}
            value={values.warehouse_id}
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
            value={values.section_id}
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
            value={values.corridor_id}
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
            value={values.rack_id}
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
            value={values.level_id}
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
            value={values.position_id}
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
          sx={{ mb: 3 }}
          required
          disabled
          value={values.name}
          {...getFieldProps('name')}
          error={Boolean(touched.name && errors.name)}
          helperText={touched.name && errors.name}
        />

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>

          <Link
            component={RouterLink}
            to={`${PATH_APP.locations.corridors.root}`}>
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
