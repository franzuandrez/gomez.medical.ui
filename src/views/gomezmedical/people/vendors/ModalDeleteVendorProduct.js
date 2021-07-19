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
  vendor_id: PropTypes.number.isRequired,


};
export default function ModalDeleteVendorProduct({ product,vendor_id }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAccept = () => {

    setSubmitting(true);
    apiVendorProducts.custom(`v1/vendors/${vendor_id}/products/${product.product_id}`, {
      method: 'delete',
    }).then((res) => {

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
        <DialogTitle>¿Esta seguro de quitar  {product.name} del listado?</DialogTitle>
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
