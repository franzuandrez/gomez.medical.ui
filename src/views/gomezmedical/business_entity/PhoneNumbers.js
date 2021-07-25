import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

import {
  Box,
  Grid,
  Card,
  Button,
  TableCell,
  Table,
  CardContent,
  TextField,
  FormControl, InputLabel, MenuItem, FormHelperText, CardHeader
} from '@material-ui/core';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { LoadingButton } from '@material-ui/lab';


import apiBusinessEntityPhoneNumberType from '../../../services/api/businessEntity/apiBusinessEntityPhoneNumberType';
import ApiBusinessEntityPhoneNumber from '../../../services/api/businessEntity/ApiBusinessEntityPhoneNumber';


PhoneNumbers.propTypes = {
  businessEntity: PropTypes.object,
};

export default function PhoneNumbers({ businessEntity }) {


  const { enqueueSnackbar } = useSnackbar();

  const [phoneNumbers, setPhoneNumbers] = useState(businessEntity?.phone_numbers || []);
  const { data: phone_number_type } = useQuery('phone_number_type', async () => {
    const res = await apiBusinessEntityPhoneNumberType.getAll();
    return res.data;
  });

  const PhoneNumberSchema = Yup.object().shape({
    phone_number: Yup.string().required('El número de telefono es requerido'),
    phone_number_type_id: Yup.string().required('Tipo de contacto requerido'),
  });

  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      phone_number: '',
      business_entity_id: businessEntity?.business_entity_id || '',
      phone_number_type_id: ''
    },
    validationSchema: PhoneNumberSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {


      setSubmitting(true);

      const result = await ApiBusinessEntityPhoneNumber.post(values);
      setPhoneNumbers([
        ...phoneNumbers,
        {
          phone_number_type: result.phone_number_type,
          phone_number: result.phone_number
        }
      ]);
      enqueueSnackbar('Contacto agregado correctamente', { variant: 'success' });
      resetForm();

      setSubmitting(false);

    }
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    resetForm
  } = formik;


  const handleChangePhoneNumberType = (event) => {
    setFieldValue('phone_number_type_id', event.target.value, true);
  };
  const handleClickCancel = () => {
    resetForm();
  };
  return (
      <FormikProvider value={formik}>
        <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
          <Card>
            <CardHeader
              title='Contacto'
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Número telefonico'
                    {...getFieldProps('phone_number')}
                    value={values.phone_number}
                    error={Boolean(touched.phone_number && errors.phone_number)}
                    helperText={touched.phone_number && errors.phone_number}
                  />
                </Grid>

              </Grid>

              <FormControl
                fullWidth
                error={Boolean(touched.phone_number_type_id && errors.phone_number_type_id)}
              >
                <InputLabel>Tipo de Contacto</InputLabel>
                <Select
                  required
                  fullWidth
                  sx={{ mb: 3 }}
                  {...getFieldProps('phone_number_type_id')}
                  onChange={handleChangePhoneNumberType}
                >
                  {
                    phone_number_type && phone_number_type.map(type =>
                      <MenuItem key={`phone_number_type_id-${type.phone_number_type_id}`}
                                value={type.phone_number_type_id}>
                        {type.name}
                      </MenuItem>
                    )
                  }
                </Select>
                <FormHelperText>  {touched.phone_number_type_id && errors.phone_number_type_id}</FormHelperText>
              </FormControl>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>


                <Button
                  type='button'
                  color='inherit'
                  variant='outlined'
                  sx={{ mr: 1.5 }}
                  onClick={handleClickCancel}
                >
                  Cancelar
                </Button>


                <LoadingButton
                  type='submit'
                  variant='contained'
                  color='primary'
                  pending={isSubmitting}
                >
                  Agregar
                </LoadingButton>
              </Box>
              <Box>
                <TableContainer component={Paper}>
                  <Table aria-label='Telefonos'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Numero de telefono</TableCell>
                        <TableCell>Tipo</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {phoneNumbers.map((phone) => (
                        <TableRow key={`phone-number-${phone.phone_number}`}>
                          <TableCell component='td' scope='row'>
                            {phone.phone_number}
                          </TableCell>
                          <TableCell>{phone.phone_number_type.name}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        </Form>
      </FormikProvider>


  );
}
