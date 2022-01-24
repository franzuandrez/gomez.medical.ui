import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent, Button
} from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


SalesCustomerList.propTypes = {
  customers: PropTypes.array,
  onClose: PropTypes.func,
  open: PropTypes.bool
};
export default function SalesCustomerList({ customers, onClose, open }) {


  const content = customers.map((customer) => (
    <TableRow
      key={`customer-${customer.customer_id}`}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row'>

        {customer.nit}
      </TableCell>
      <TableCell component='td' scope='row'>
        {`${customer.person?.first_name ?? ''}  ${customer.person?.last_name ?? ''}  ${customer.business_name ?? ''}`}
      </TableCell>

    </TableRow>

  ));


  return (
    <div>
      <Dialog
        maxWidth='lg'
        open={open} onClose={onClose}>
        <DialogTitle>Clientes</DialogTitle>
        <DialogContent>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Nit
                  </TableCell>
                  <TableCell>
                    Nombre
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {content}
              </TableBody>

            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>

  )
    ;
}
