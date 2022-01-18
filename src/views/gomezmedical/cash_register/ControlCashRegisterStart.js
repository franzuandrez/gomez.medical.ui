import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import * as Yup from 'yup';
import { ErrorMessage, Form, FormikProvider, useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel, Link,
  OutlinedInput
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { PATH_APP } from '../../../routes/paths';
import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
import apiPaymentType from '../../../services/api/payment_type/apiPaymentType';
import apiControlCashRegister from '../../../services/api/cash_register/apiControlCashRegister';


export default function ControlCashRegisterStart() {


  const { enqueueSnackbar } = useSnackbar();
  const [paymentTypesToadd, setPaymentTypesToAdd] = useState([]);
  useQuery('payment_types', async () => {
    const result = await apiPaymentType.getAll('q=?');
    const payments = result.data.map(payment => ({
      payment_type_id: payment.id, name: payment.name, start_value: ''
    }));
    setPaymentTypesToAdd(payments);
    return result;

  }, {
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false
  });


  const ControlCashRegisterSchema = Yup.object().shape({
    detail: Yup.array().of(
      Yup.object().shape({
        payment_type_id: Yup.number().required('Id requerido'),
        start_value: Yup.number().typeError('Debes digitar una cantidad válida').required('Monto requerido')
      })
    )
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      started_at: '',
      shift_id: '',
      detail: paymentTypesToadd
    },

    validationSchema: ControlCashRegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {

        setSubmitting(true);
        await apiControlCashRegister.post(values);


        enqueueSnackbar('Inicio de Caja correctamente', { variant: 'success' });
        setSubmitting(false);
        resetForm();
        setPaymentTypesToAdd(paymentTypesToadd.map(payment => ({
          payment_type_id: payment.payment_type_id, name: payment.name, start_value: ''
        })));
      } catch (error) {

        setSubmitting(false);
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }
    }
  });

  const {
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps

  } = formik;


  const handleChange = (id, e) => {

    const payment = paymentTypesToadd.filter(payment => payment.payment_type_id === id)[0];
    payment.start_value = e.target.value;
    setPaymentTypesToAdd([...paymentTypesToadd]);

  };
  return (
    <Page title='Control Caja: Iniciar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Iniciar Control de caja'
          links={[
            { name: 'Listado', href: PATH_APP.cash_register_control.controls.root },
            { name: 'Iniciar' }
          ]}

        />

        <TableContainer component={Paper}>
          <FormikProvider value={formik}>
            <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Tipo Pago
                    </TableCell>
                    <TableCell>
                      Cantidad en Caja
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {values.detail.map((payment, index) => (

                    <TableRow
                      key={`payment-control-cash-${payment.payment_type_id}`}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component='td' scope='row'>
                        {payment.name}
                      </TableCell>
                      <TableCell component='td' scope='row'>
                        <FormControl fullWidth sx={{ m: 1 }}>
                          <InputLabel>Monto</InputLabel>
                          <OutlinedInput
                            value={payment.start_value}
                            {...getFieldProps(`detail.${index}.start_value`)}
                            onChange={(e) => handleChange(payment.payment_type_id, e)}
                            startAdornment={<InputAdornment position='start'>Q</InputAdornment>}
                            label='Monto'
                          />
                          <ErrorMessage name={`detail.${index}.start_value`} />
                        </FormControl>


                      </TableCell>
                    </TableRow>

                  ))
                  }

                </TableBody>

              </Table>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>


                <Link
                  component={RouterLink}
                  to={`${PATH_APP.cash_register_control.controls.root}`}>
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
        </TableContainer>
      </Container>
    </Page>
  )
    ;
}
