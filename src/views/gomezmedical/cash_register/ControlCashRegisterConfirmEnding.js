import { useState } from 'react';
// material
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
//
import { MButton } from '../../../components/@material-extend';


// ----------------------------------------------------------------------

export default function ControlCashRegisterConfirmEnding({ isSubmitting, onSubmit }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {

    handleClose();
    onSubmit();
  };


  return (
    <div>
      <MButton color='primary' variant='contained' onClick={handleClickOpen}>
        Finalizar
      </MButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>¿Esta seguro de realizar el cierre de caja?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tome en cuenta que esta acción no es reversible
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Cancelar</Button>
          <LoadingButton
            type='submit'
            variant='contained'
            color='primary'
            onClick={onSubmit}
            pending={isSubmitting}
          >
            Aceptar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
