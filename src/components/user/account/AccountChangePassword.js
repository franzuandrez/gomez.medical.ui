import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Box, Card, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// utils
import fakeRequest from '../../../utils/fakeRequest';

// ----------------------------------------------------------------------

AccountChangePassword.propTypes = {
  sx: PropTypes.object
};

export default function AccountChangePassword({ sx, ...other }) {
  const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Contraseña antigua requerida'),
    newPassword: Yup.string()
      .min(6, 'La contraseña debe contener al menos 6 caracteres')
      .required('La nueva contraseña es requerida'),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      'Las contraseñas deben coincidir'
    )
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await fakeRequest(500);
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      enqueueSnackbar('Save success', { variant: 'success' });
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3, ...sx }} {...other}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <TextField
            {...getFieldProps('oldPassword')}
            fullWidth
            autoComplete="on"
            type="password"
            label="Contraseña antigua"
            error={Boolean(touched.oldPassword && errors.oldPassword)}
            helperText={touched.oldPassword && errors.oldPassword}
            sx={{ mb: 3 }}
          />

          <TextField
            {...getFieldProps('newPassword')}
            fullWidth
            autoComplete="on"
            type="password"
            label="Nueva contraseña"
            error={Boolean(touched.newPassword && errors.newPassword)}
            helperText={
              (touched.newPassword && errors.newPassword) ||
              'La contraseña debe tener mínimo 6+'
            }
            sx={{ mb: 3 }}
          />

          <TextField
            {...getFieldProps('confirmNewPassword')}
            fullWidth
            autoComplete="on"
            type="password"
            label="Confirmar la contraseña nueva"
            error={Boolean(
              touched.confirmNewPassword && errors.confirmNewPassword
            )}
            helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            sx={{ mb: 3 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              type="submit"
              variant="contained"
              pending={isSubmitting}
              disabled
            >
              Guardar
            </LoadingButton>
          </Box>
        </Form>
      </FormikProvider>
    </Card>
  );
}
