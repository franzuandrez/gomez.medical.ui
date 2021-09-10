import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  Button,
  CardContent, Link, Stack, CardHeader, TextField, FormControl, InputLabel, MenuItem, Select, FormHelperText
} from '@material-ui/core';
import { DesktopDatePicker, LoadingButton } from '@material-ui/lab';


import { PATH_APP } from '../../../../routes/paths';
import PhoneNumbers from '../../business_entity/PhoneNumbers';
import Addresses from '../../business_entity/Addresses';
import PersonForm from '../PersonForm';
import EmployeeUserForm from './EmployeeUserForm';
import apiEmployee from '../../../../services/api/people/apiEmployee';


EmployeeGeneralForm.propTypes = {
  employee: PropTypes.object,
  isEdit: PropTypes.bool,
  redirectBack: PropTypes.bool
};

export default function EmployeeGeneralForm({ employee, isEdit = false, redirectBack = false }) {

  const { enqueueSnackbar } = useSnackbar();
  const [isSaved, setIsSaved] = useState(false);
  const [employeeSaved, setEmployeeSaved] = useState(employee);
  const [birthDate, setBirthDate] = useState(employee?.birth_date || new Date(new Date().setFullYear(new Date().getFullYear() - 19)));
  const [hiredDate, setHiredDate] = useState(employee?.hired_date || new Date());
  const [maritalStatus, setMaritalStatus] = useState(employee?.marital_status || '');
  const [genderStatus, setGenderStatus] = useState(employee?.gender || '');
  const [openMaritalStatus, setOpenMaritalStatus] = useState(false);
  const [openGender, setOpenGender] = useState(false);

  const handleChangeMaritalStatus = (event) => {
    setFieldValue('marital_status', event.target.value);
  };

  const handleCloseMaritalStatus = () => {
    setOpenMaritalStatus(false);
  };

  const handleOpenMaritalStatus = () => {
    setOpenMaritalStatus(true);
  };

  const handleChangeGender = (event) => {


    setFieldValue('gender', event.target.value);
  };

  const handleCloseGender = () => {
    setOpenGender(false);
  };

  const handleOpenGender = () => {
    setOpenGender(true);
  };

  const EmployeeSchema = Yup.object().shape({
    national_id_number: Yup.string().required('DPI requerido'),
    job_title: Yup.string().required('Puesto requerido'),
    birth_date: Yup.string().required('Fecha de nacimiento requerida'),
    hired_date: Yup.string().required('Fecha de contratación requerida'),
    marital_status: Yup.string().required('Estado Civil requerido'),
    gender: Yup.string().required('Genero requerido')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      national_id_number: employee?.national_id_number || '',
      job_title: employee?.job_title || '',
      birth_date: birthDate,
      hired_date: hiredDate,
      marital_status: maritalStatus,
      gender: genderStatus,
      first_name: employee?.person?.first_name || '',
      middle_name: employee?.person?.middle_name || '',
      last_name: employee?.person?.last_name || '',
      title: employee?.person?.title || '',
      suffix: employee?.person?.suffix || '',
      person_id: employee?.person?.person_id || ''
    },

    validationSchema: EmployeeSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {

        setSubmitting(true);
        let result;
        if (isEdit || isSaved) {
          result = await apiEmployee.patch(values, employeeSaved.employee_id);
        } else {
          result = await apiEmployee.post(values);
        }
        enqueueSnackbar(!isEdit ? 'Creado correctamente' : 'Actualizado correctamente', { variant: 'success' });

        setSubmitting(false);
        setIsSaved(true);
        setEmployeeSaved(result);


      } catch (error) {
        setSubmitting(false);
        setBirthDate('');
        setHiredDate('');
        setGenderStatus('');
        setMaritalStatus('');
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;


  return (
    <Grid container spacing={2}>

      <Grid item xs={12} md={12}>
        <Card>
          <CardHeader
            title='Información General'
          />

          <FormikProvider value={formik}>
            <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <CardContent>
                  <Grid container spacing={2}>
                    <PersonForm formik={formik} />

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='DPI'
                        {...getFieldProps('national_id_number')}
                        value={values.national_id_number}
                        error={Boolean(touched.national_id_number && errors.national_id_number)}
                        helperText={touched.national_id_number && errors.national_id_number}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label='Puesto'
                        {...getFieldProps('job_title')}
                        value={values.job_title}
                        error={Boolean(touched.job_title && errors.job_title)}
                        helperText={touched.job_title && errors.job_title}
                      />
                    </Grid>
                    {!isEdit &&
                    <>
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          fullWidth
                          error={touched.birth_date && errors.birth_date}
                        >
                          <DesktopDatePicker
                            label='Fecha de nacimiento'
                            value={values.birth_date}
                            onChange={(newValue) => {
                              if (newValue) {
                                setFieldValue('birth_date', newValue);
                              }

                            }}
                            renderInput={(params) => (
                              <TextField {...params} fullWidth margin='normal' />
                            )}
                          />
                          <FormHelperText>  {touched.birth_date && errors.birth_date}</FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          fullWidth
                          error={touched.hired_date && errors.hired_date}
                        >
                          <DesktopDatePicker
                            label='Fecha de Contratación'
                            maxDate={new Date()}
                            value={values.hired_date}
                            onChange={(newValue) => {
                              if (newValue) {
                                setFieldValue('hired_date', newValue);
                              }
                            }}
                            renderInput={(params) => (
                              <TextField {...params} fullWidth margin='normal' />
                            )}
                          />
                          <FormHelperText>  {touched.hired_date && errors.hired_date}</FormHelperText>
                        </FormControl>
                      </Grid>
                    </>
                    }
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.marital_status && errors.marital_status)}
                      >
                        <InputLabel>Estado Civil</InputLabel>
                        <Select
                          fullWidth
                          open={openMaritalStatus}
                          onClose={handleCloseMaritalStatus}
                          onOpen={handleOpenMaritalStatus}
                          value={values.marital_status}
                          onChange={handleChangeMaritalStatus}
                        >
                          <MenuItem value='M'>Casado</MenuItem>
                          <MenuItem value='S'>Soltero</MenuItem>
                        </Select>
                        <FormHelperText>  {touched.marital_status && errors.marital_status}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.gender && errors.gender)}
                      >
                        <InputLabel>Genero</InputLabel>
                        <Select
                          fullWidth
                          open={openGender}
                          onClose={handleCloseGender}
                          onOpen={handleOpenGender}
                          value={values.gender}
                          onChange={handleChangeGender}
                        >
                          <MenuItem value='M'>Hombre</MenuItem>
                          <MenuItem value='F'>Mujer</MenuItem>
                        </Select>
                        <FormHelperText>  {touched.gender && errors.gender}</FormHelperText>
                      </FormControl>

                    </Grid>


                  </Grid>


                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>

                    {redirectBack &&
                    <Link
                      component={RouterLink}
                      to={`${PATH_APP.people.employees.root}`}>
                      <Button
                        type='button'
                        color='inherit'
                        variant='outlined'
                        sx={{ mr: 1.5 }}
                      >
                        Cancelar
                      </Button>
                    </Link>
                    }

                    <LoadingButton
                      type='submit'
                      variant='contained'
                      color='primary'
                      pending={isSubmitting}
                    >
                      Guardar
                    </LoadingButton>
                  </Box>
                </CardContent>
              </Stack>


            </Form>

          </FormikProvider>
        </Card>
      </Grid>

      {
        (isSaved || isEdit) &&
        <>
          <Grid item xs={12} md={12}>
            <EmployeeUserForm employee={employeeSaved} isEdit />
          </Grid>
          <Grid item xs={12} md={12}>
            <Addresses
              businessEntity={employeeSaved?.business_entity}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <PhoneNumbers
              businessEntity={employeeSaved?.business_entity}
            />
          </Grid>
        </>
      }

    </Grid>
  );
}
