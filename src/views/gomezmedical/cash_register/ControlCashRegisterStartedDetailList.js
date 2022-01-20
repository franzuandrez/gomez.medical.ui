import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { fCurrency } from '../../../utils/formatNumber';

export default function ControlCashRegisterStartedDetailList({ detail }) {


  return (

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
          {detail.map((det) => (
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

    </TableContainer>

  )
    ;
}
