import { useEffect, useState } from 'react';
// material
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions
} from '@material-ui/core';
import PropTypes from 'prop-types';

//


import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@material-ui/lab';
import { MIconButton } from '../../../components/@material-extend';


// ----------------------------------------------------------------------
ModalDelete.propTypes = {
  item: PropTypes.string.isRequired,
  itemId: PropTypes.number.isRequired,
  deleteFunction: PropTypes.func.isRequired
};
export default function ModalDelete({ item, itemId, deleteFunction }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isAccepted, setAccepted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {

    if (isAccepted) {
      dispatch(deleteFunction({ itemId }));
    }
  }, [deleteFunction, dispatch, isAccepted, itemId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAccept = () => {
    setSubmitting(true);
    setAccepted(true);

  };
  const handleClose = () => {
    setOpen(false);
  };

  return (

    <>

      <MIconButton color='error' onClick={handleClickOpen}>
        <DeleteIcon />
      </MIconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>¿Desea dar de baja {item}?</DialogTitle>
        <DialogActions>
          <Button color='inherit' onClick={handleClose}>
            Cancelar
          </Button>
          <LoadingButton
            pending={isSubmitting}
            variant='contained' color='error' onClick={handleAccept}>
            Aceptar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );

}
