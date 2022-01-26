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
import { MIconButton } from '../../../../components/@material-extend';
import apiVendorProducts from '../../../../services/api/people/apiVendorProducts';


// ----------------------------------------------------------------------
ModalDeleteVendorProduct.propTypes = {
  product: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool

};
export default function ModalDeleteVendorProduct({ product, onSubmit, onOpen, onClose, open }) {

  const [isSubmitting, setSubmitting] = useState(false);
  const handleSubmit = async () => {
    setSubmitting(false);
    await onSubmit();
    setSubmitting(true);
  };

  return (

    <>

      <MIconButton color='error' onClick={onOpen}>
        <DeleteIcon />
      </MIconButton>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>¿Esta seguro de quitar {product.name} del listado?</DialogTitle>
        <DialogActions>
          <Button color='inherit' onClick={onClose}>
            Cancelar
          </Button>
          <LoadingButton
            pending={isSubmitting}
            variant='contained' color='error' onClick={handleSubmit}>
            Aceptar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );

}
