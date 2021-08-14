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

export default function SalesAddCustomer({ open, onClose, onOPen }) {


  return (
    <div>
      <MButton  variant="outlined" color="success" onClick={onOPen}>
        Nuevo Cliente
      </MButton>
      <Dialog
        maxWidth='lg'
        open={open} onClose={onClose}>
        <DialogTitle >Nuevo Cliente</DialogTitle>
        <DialogContent>

          <CustomerGeneralForm

          />

        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
