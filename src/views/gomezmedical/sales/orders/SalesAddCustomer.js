import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@material-ui/core';
//
import { MButton } from '../../../../components/@material-extend';
import CustomerGeneralForm from '../../people/customers/CustomerGeneralForm';

// ----------------------------------------------------------------------


SalesAddCustomer.propTypes = {
  open: PropTypes.bool,
  onOPen: PropTypes.func,
  onClose: PropTypes.func,
  customerQuery: PropTypes.string,
};

export default function SalesAddCustomer({ open, onClose, onOPen, customerQuery }) {


  const getCustomerInfo = (customerQuery) => {

      const isNitDigitised = /(\d{7}-\d)|(\d{1,8})/.test(customerQuery);
      if (isNitDigitised) {
        return { nit: customerQuery };
      }
      return { person: { first_name: customerQuery } };
    }


  ;


  return (
    <div>
      <MButton variant='outlined' color='primary' onClick={onOPen}>
        Nuevo Cliente
      </MButton>
      <Dialog
        maxWidth='lg'
        open={open} onClose={onClose}>
        <DialogTitle>Nuevo Cliente</DialogTitle>
        <DialogContent>

          <CustomerGeneralForm
            customer={getCustomerInfo(customerQuery)}
            openWithMinimalInformation
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
