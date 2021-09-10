import { useState } from 'react';
import PropTypes from 'prop-types';
// material
import {
  Grid,
  Card,
  CardContent,
  TextField,
  CardHeader, InputAdornment, IconButton, Box, Button
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useSnackbar } from 'notistack';

import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import apiEmployeeUser from '../../../../services/api/people/apiEmployeeUser';


EmployeeUserForm.propTypes = {
  employee: PropTypes.object,
  isEdit: PropTypes.bool
};

export default function EmployeeUserForm({ employee, isEdit = false }) {
  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();


  const EmployeeUserSchema = Yup.object().shape({
    username: Yup.string().required('El usuario es requerido'),
    email: Yup.string()
      .email('El correo debe ser un correo válido')
      .required('El correo es requerido'),
    password: Yup.string().required('La contraseña es requerida')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      user_id: employee.user?.id || '',
      username: employee.user?.username || '',
      email: employee.user?.email || '',
      password: isEdit ? 'none' : '',
      employee_id: employee?.employee_id
    },
    validationSchema: EmployeeUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {

      let result;
      if (isEdit) {
        result = await apiEmployeeUser.patch(values, values.user_id);
      } else {
        result = await apiEmployeeUser.post(values);
      }
      if (result.status) {
        enqueueSnackbar(result.data.message, { variant: 'error' });
      } else {
        enqueueSnackbar('Guardado correctamente', { variant: 'success' });
        resetForm();
      }

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
    resetForm
  } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const handleClickCancel = () => {
    resetForm();
  };
  return (

    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Card>
          <CardHeader
            title='Información de usuario'
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Nombre de Usuario'
                  {...getFieldProps('username')}
                  value={values.username}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Correo'
                  {...getFieldProps('email')}
                  value={values.email}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              {
                !isEdit &&
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    autoComplete='current-password'
                    type={showPassword ? 'text' : 'password'}
                    label='Contraseña'
                    {...getFieldProps('password')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton onClick={handleShowPassword} edge='end'>
                            <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    error={
                      Boolean(touched.password && errors.password)
                    }
                    helperText={
                      (touched.password && errors.password)
                    }
                  />
                </Grid>
              }

            </Grid>
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
                Guardar
              </LoadingButton>
            </Box>
          </CardContent>
        </Card>
      </Form>
    </FormikProvider>


  );
}
