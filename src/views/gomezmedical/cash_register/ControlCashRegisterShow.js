import { useQuery } from 'react-query';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Link

} from '@material-ui/core';
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


export default function ControlCashRegisterStart() {


  const { controlCashRegisterId } = useParams();

  const {
    data: controlCashRegister,
    isLoading
  } = useQuery(['control_cash_register_show', controlCashRegisterId], () => apiControlCashRegister.getSingle(controlCashRegisterId)
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });


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

          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
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
                  En Caja
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {!isLoading && controlCashRegister.detail.map((det) => (

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
                    {fCurrency(parseFloat(det.start_value) + parseFloat(det.income) - parseFloat(det.outcome))}
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
                Regresar
              </Button>
            </Link>

          </Box>

        </TableContainer>
      </Container>
    </Page>
  )
    ;
}
