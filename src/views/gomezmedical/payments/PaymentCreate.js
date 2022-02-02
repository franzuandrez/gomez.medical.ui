import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  Grid,
  Link,
  Card,
  CardContent,
  TextField, MenuItem, InputAdornment
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@material-ui/lab';
import { PATH_APP } from '../../../routes/paths';
import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
import apiPayments from '../../../services/api/payment/apiPayments';
import PaymentTypesSearchBox from '../payment_types/PaymentTypeSearchBox';


export default function PaymentCreate() {

  const { enqueueSnackbar } = useSnackbar();



  const PaymentSchema = Yup.object().shape({
    payment_type_id: Yup.string().required('Forma de pago requerida'),
    doc_type: Yup.string().required('Motivo de pago requerido'),
    amount: Yup.number().required('Monto requerido'),
    description: Yup.string().required('Descripcion requerida')
  });


  const formik = useFormik({
    initialValues: {
      doc_type: '',
      payment_type_id: '',
      amount: '',
      description: '',
      comments: ''
    },
    validationSchema: PaymentSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {

        await apiPayments.post(values);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Registrado correctamente', { variant: 'success' });

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
  const handleChangePaymentType = (event) => {

    setFieldValue('payment_type_id', event.target.value, true);
  };
  const handleChangeDocType = (event) => {

    setFieldValue('doc_type', event.target.value, true);
  };
  return (
    <Page title='Pago: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nuevo  Pago'
          links={[
            { name: 'Pagos', href: PATH_APP.payments.root },
            { name: 'Crear' }
          ]}

        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Card>

              <CardContent>
                <FormikProvider value={formik}>
                  <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <PaymentTypesSearchBox formik={formik}
                                               handleChangePaymentType={handleChangePaymentType}
                                               required />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          fullWidth
                          error={Boolean(touched.doc_type && errors.doc_type)}
                        >
                          <InputLabel>Motivo</InputLabel>
                          <Select
                            required
                            fullWidth
                            sx={{ mb: 3 }}
                            {...getFieldProps('doc_type')}
                            onChange={handleChangeDocType}
                          >
                            <MenuItem value='TRASH_SERVICE'> Servicio de basura</MenuItem>
                            <MenuItem value='RENT'> Pago de local</MenuItem>
                            <MenuItem value='OTHER'> Otro</MenuItem>

                          </Select>
                          <FormHelperText>  {touched.doc_type && errors.doc_type}</FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label='Descripción'
                          variant='outlined'
                          color='primary'
                          sx={{ mb: 3 }}
                          required
                          fullWidth
                          value={values.description}
                          {...getFieldProps('description')}
                          error={Boolean(touched.description && errors.description)}
                          helperText={touched.description && errors.description}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label='Monto'
                          variant='outlined'
                          color='primary'
                          sx={{ mb: 3 }}
                          required
                          fullWidth
                          InputProps={{
                            startAdornment: <InputAdornment position='start'>Q</InputAdornment>
                          }}
                          value={values.amount}
                          {...getFieldProps('amount')}
                          error={Boolean(touched.amount && errors.amount)}
                          helperText={touched.amount && errors.amount}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          fullWidth
                          multiline
                          minRows={4}
                          maxRows={6}
                          label='Observaciones'
                          {...getFieldProps('comments')}
                          sx={{ mb: 3 }}
                        />
                      </Grid>
                    </Grid>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>

                      <Link
                        component={RouterLink}
                        to={`${PATH_APP.payments.root}`}>
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
          </Grid>
        </Grid>


      </Container>
    </Page>
  );
}
