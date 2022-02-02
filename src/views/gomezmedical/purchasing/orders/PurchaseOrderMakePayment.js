import { useParams } from 'react-router';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Link as RouterLink } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { Box, Button, Card, CardContent, Container, Grid, Link, Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import { PATH_APP } from '../../../../routes/paths';
import apiPurchaseMakePayment from '../../../../services/api/purchasing/apiPurchaseMakePayment';
import PaymentTypesSearchBox from '../../payment_types/PaymentTypeSearchBox';


export default function PurchaseOrderMakePayment() {

  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();


  const PurchaseMakePaymentSchema = Yup.object().shape({
    doc_number_reference: Yup.string().required('No. Documento requerido'),
    amount: Yup.number().required('Monto requerido'),
    payment_type_id: Yup.string().required('Tipo de pago')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      doc_number_reference: '',
      amount: '',
      payment_type_id: '',
      observations: '',
      purchase_id: id
    },
    validationSchema: PurchaseMakePaymentSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {

        setSubmitting(true);
        await apiPurchaseMakePayment.post(values);
        enqueueSnackbar('Guardado correctamente', { variant: 'success' });
        setSubmitting(false);


      } catch (error) {
        setSubmitting(false);
        console.log(error)
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
  const handleChangePaymentType = (event) => {

    setFieldValue('payment_type_id', event.target.value, true);
  };
  return (
    <Page title='Orden Compra: Realizar pago | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Realizar pago'
          links={[
            { name: 'Ver', href: PATH_APP.purchasing.orders.root },
            { name: 'Realizar pago' }
          ]}

        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Card>
              <FormikProvider value={formik}>
                <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label='No. Documento'
                            {...getFieldProps('doc_number_reference')}
                            value={values.doc_number_reference}
                            error={Boolean(touched.doc_number_reference && errors.doc_number_reference)}
                            helperText={touched.doc_number_reference && errors.doc_number_reference}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <PaymentTypesSearchBox formik={formik}
                                                 required
                                                 handleChangePaymentType={handleChangePaymentType}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label='Monto'
                            {...getFieldProps('amount')}
                            value={values.amount}
                            error={Boolean(touched.amount && errors.amount)}
                            helperText={touched.amount && errors.amount}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            multiline
                            minRows={4}
                            maxRows={6}
                            label='Observaciones'
                            {...getFieldProps('observations')}
                            sx={{ mb: 3 }}
                          />
                        </Grid>


                      </Grid>
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>

                        <Link
                          component={RouterLink}
                          to={`${PATH_APP.purchasing.ship_methods.root}`}>
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
                    </CardContent>
                  </Stack>

                </Form>

              </FormikProvider>
            </Card>
          </Grid>


        </Grid>

      </Container>
    </Page>
  );
}
