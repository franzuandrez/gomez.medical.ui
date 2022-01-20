import { ErrorMessage, Form, FormikProvider } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { Box, FormControl, InputAdornment, InputLabel, Link, OutlinedInput, Typography,  Button } from '@material-ui/core';
import { fCurrency } from '../../../utils/formatNumber';
import ControlCashRegisterConfirmEnding from './ControlCashRegisterConfirmEnding';
import { PATH_APP } from '../../../routes/paths';

export default function ControlCashRegisterEndList({ handleChangeAmount, formik }) {

  const {
    values,
    isSubmitting,
    handleSubmit

  } = formik;
  return (

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

              {values.detail.map((det, index) => {
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
  )
    ;
}
