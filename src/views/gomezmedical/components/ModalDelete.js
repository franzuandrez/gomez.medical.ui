import { useState } from 'react';
import { useSnackbar } from 'notistack';

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
import { LoadingButton } from '@material-ui/lab';
import { MIconButton } from '../../../components/@material-extend';


// ----------------------------------------------------------------------
ModalDelete.propTypes = {
  item: PropTypes.string.isRequired,
  itemId: PropTypes.number.isRequired,
  apiService: PropTypes.object.isRequired

};
export default function ModalDelete({ item, itemId, apiService }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAccept = () => {

    setSubmitting(true);
    apiService.remove(itemId).then((res) => {

        if (res.status === 500) {
          enqueueSnackbar(res.data, { variant: 'error' });
        } else {
          setOpen(false);
        }
        setSubmitting(false);
      }
    )
    ;


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
