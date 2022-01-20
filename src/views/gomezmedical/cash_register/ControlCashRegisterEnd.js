import { useQuery } from 'react-query';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Container, FormControl, Grid, InputAdornment, InputLabel,
  Link, OutlinedInput, Typography

} from '@material-ui/core';
import { ErrorMessage, Form, FormikProvider, useFormik } from 'formik';
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
import apiControlCashRegister from '../../../services/api/cash_register/apiControlCashRegister';
import { fCurrency } from '../../../utils/formatNumber';
import Label from '../../../components/Label';
import ControlCashRegisterConfirmEnding from './ControlCashRegisterConfirmEnding';


export default function ControlCashRegisterStart() {


  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [detail, setDetail] = useState([]);

  const {
    data: controlCashRegister,
    isLoading
  } = useQuery(['control_cash_register_end', id], async () => {
      const result = await apiControlCashRegister.getSingle(id);

      setDetail(result.detail);
      return result;
    }
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });

  const ControlCashRegisterSchema = Yup.object().shape({
    detail: Yup.array().of(
      Yup.object().shape({
        id: Yup.number().required('Id requerido'),
        counted: Yup.number().typeError('Debes digitar una cantidad válida').required('Monto requerido')
      })
    )
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      detail
    },

    validationSchema: ControlCashRegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {

        setSubmitting(true);
        await apiControlCashRegister.patch(values, id);


        enqueueSnackbar('Caja correctamente cerrada correctamente', { variant: 'success' });
        setSubmitting(false);
        resetForm();
        setDetail([]);

      } catch (error) {

        setSubmitting(false);
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }
    }
  });

  const {
    values,
    isSubmitting,
    handleSubmit

  } = formik;

  const handleChangeAmount = (e, id) => {

    const det = detail.filter(det => det.id === id)[0];
    det.counted = e.target.value;
    det.in_drawer = parseFloat(det.start_value) + parseFloat(det.income) - parseFloat(det.outcome);
    det.total_system = parseFloat(det.income) - parseFloat(det.outcome);
    det.difference = parseFloat(det.counted ) - parseFloat(det.in_drawer);
    det.cash_out = parseFloat('0');
    det.new_start_value = det.counted - det.cash_out;
    setDetail([...detail]);

  };

  return (
    <Page title='Control Caja: Finalizar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Iniciar Control de caja'
          links={[
            { name: 'Listado', href: PATH_APP.cash_register_control.controls.root },
            { name: 'Finalizar' }
          ]}

        />
        {!isLoading &&
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'left' } }}>
              <Typography
                paragraph
                variant='overline'
                sx={{ color: 'text.disabled' }}
              >
                General
              </Typography>
              <Typography variant='body2'>
                Vendedor: {controlCashRegister.control.sales_person.person.first_name} {controlCashRegister.control.sales_person.person.last_name}
              </Typography>
              <Typography variant='body2'>
                Turno: {controlCashRegister.control.shift.name}
              </Typography>

            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                color={controlCashRegister.control.status === 'finalizado' ? 'success' : 'warning'}
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {controlCashRegister.control.status}
              </Label>
              <Typography
                variant='h6'>Caja: {controlCashRegister.control.cash_register.cash_register_number}</Typography>

            </Box>

          </Grid>

        </Grid>
        }
        <FormikProvider value={formik}>
          <Form autoComplete='off' noValidate>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Tipo Pago
                    </TableCell>
                    <TableCell>
                      Cantidad Inicial
                    </TableCell>
                    <TableCell>
                      Entradas
                    </TableCell>
                    <TableCell>
                      Salidas
                    </TableCell>
                    <TableCell>
                      Sistema
                    </TableCell>
                    <TableCell>
                      Físicamente
                    </TableCell>
                    <TableCell>
                      Diff
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {!isLoading && values.detail.map((det, index) => {
                    const total_system = parseFloat(det.start_value) + parseFloat(det.income) - parseFloat(det.outcome);
                    const diff = parseFloat(det.counted) - total_system;
                    const alert = diff > 0 ? 'warning.main' : 'error.main';

                    return (
                      <TableRow
                        key={`control-cash-detail-${det.id}`}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component='td' scope='row'>
                          {det.name}
                        </TableCell>
                        <TableCell component='td' scope='row'>
                          {fCurrency(det.start_value)}
                        </TableCell>
                        <TableCell component='td' scope='row'>
                          {fCurrency(det.income)}
                        </TableCell>
                        <TableCell component='td' scope='row'>

                          {fCurrency(det.outcome)}
                        </TableCell>
                        <TableCell component='td' scope='row'>
                          {fCurrency(total_system)}
                        </TableCell>
                        <TableCell component='td' scope='row'>
                          <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel>Monto</InputLabel>
                            <OutlinedInput
                              value={det.counted}
                              onChange={(e) => handleChangeAmount(e, det.id)}
                              startAdornment={<InputAdornment position='start'>Q</InputAdornment>}
                              label='Monto'
                            />
                            <ErrorMessage name={`detail.${index}.counted`} />
                          </FormControl>
                        </TableCell>
                        <TableCell component='td' scope='row'>

                          <Typography
                            sx={{ color: diff === 0 ? 'success.main' : alert }}>
                            {fCurrency(diff)}
                          </Typography>

                        </TableCell>
                      </TableRow>

                    );
                  })
                  }

                </TableBody>


              </Table>

            </TableContainer>
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
                  Regresar
                </Button>
              </Link>

              <ControlCashRegisterConfirmEnding isSubmitting={isSubmitting} onSubmit={handleSubmit} />
            </Box>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  )
    ;
}
