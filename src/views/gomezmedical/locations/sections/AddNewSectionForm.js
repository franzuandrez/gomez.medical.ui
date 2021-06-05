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
  makeStyles,
  MenuItem,
  TextField
} from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import apiSections from '../../../../services/api/sections/apiSections';
import apiWarehouses from '../../../../services/api/sections/apiWarehouses';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));
export default function AddNewSectionForm() {
  const classes = useStyles();
  const { data: warehouses } = useQuery('warehouses', apiWarehouses.getAll);

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();


  const SectionSchema = Yup.object().shape({
    name: Yup.string()
      .required('Nombre requerido'),
    warehouse_id: Yup.string().required('Seleccione Bodega')
  });


  const formik = useFormik({
    initialValues: {
      name: '',
      warehouse_id: ''
    },
    validationSchema: SectionSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {

        await apiSections.post(values);

        resetForm();
        setSubmitting(false);
        history.push('/app/locations/sections');

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

  const handleChange = (event) => {

    setFieldValue('warehouse_id', event.target.value, true);
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

  )
    ;
}
