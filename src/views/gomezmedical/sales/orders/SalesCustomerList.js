import { useState } from 'react';
import useKeyboardShortcut from 'use-keyboard-shortcut';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent, Button
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import checkmark from '@iconify/icons-eva/checkmark-circle-2-fill';
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
  onSelectCustomer: PropTypes.func,
  open: PropTypes.bool
};
export default function SalesCustomerList({ customers, onClose, open, onSelectCustomer }) {

  const [currentIndexCustomer, setCurrentIndexCustomer] = useState(-1);
  const [currentCustomerSelected, setCurrentCustomerSelected] = useState(null);

  const handleMoveAcrossAddress = (moveTo = 1) => {

    const max = (customers?.length || Infinity) - 1;
    setCurrentIndexCustomer(currentIndexCustomer - moveTo);
    if (currentIndexCustomer - moveTo >= 0 && currentIndexCustomer - moveTo <= max) {
      setCurrentIndexCustomer(currentIndexCustomer - moveTo);
      setCurrentCustomerSelected(customers[currentIndexCustomer - moveTo]);
    }
  };
  const handleSelectCustomer = (customer) => {
    setCurrentIndexCustomer(-1);
    setCurrentCustomerSelected(null);
    onSelectCustomer(customer);
    onClose();
  };
  useKeyboardShortcut(['ArrowUp'], () => handleMoveAcrossAddress(1), { overrideSystem: true });
  useKeyboardShortcut(['ArrowDown'], () => handleMoveAcrossAddress(-1), { overrideSystem: true });
  useKeyboardShortcut(['enter'], () => handleSelectCustomer(currentCustomerSelected));


  const content = customers.map((customer, index) => (
    <TableRow
      key={`customer-${customer.customer_id}`}
      selected={index === currentIndexCustomer}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row'>

        {customer.nit}
      </TableCell>
      <TableCell component='td' scope='row'>
        {`${customer.person?.first_name ?? ''}  ${customer.person?.last_name ?? ''}  ${customer.business_name ?? ''}`}
      </TableCell>
      <TableCell component='td' scope='row'>
        <Button size='small'
                color='primary'
                onClick={() => handleSelectCustomer(customer)}
                startIcon={<Icon icon={checkmark} />}
        />

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
                  <TableCell>
                    Opciones
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
