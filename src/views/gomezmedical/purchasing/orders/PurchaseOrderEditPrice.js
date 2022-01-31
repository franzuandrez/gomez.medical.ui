import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions, TextField, DialogContent
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import EditIcon from '@material-ui/icons/Edit';
import { LoadingButton } from '@material-ui/lab';
import { MIconButton } from '../../../../components/@material-extend';
import apiPurchaseEditProductPrice from '../../../../services/api/purchasing/apiPurchaseEditProductPrice';

PurchaseOrderEditPrice.propTypes = {
  detail: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  cost: PropTypes.number.isRequired
};
export default function PurchaseOrderEditPrice({ detail, product, cost, handleEditPrice }) {


  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const EditPriceProductSchema = Yup.object().shape({
    new_price: Yup.number().required('Precio requerido')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      detail_id: detail.id,
      new_price: cost || ''
    },
    validationSchema: EditPriceProductSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {


      try {
        setSubmitting(true);
        const result = await apiPurchaseEditProductPrice.patch(values, values.detail_id);

        if (result) {
          enqueueSnackbar('Actualizado correctamente', { variant: 'success' });
          handleEditPrice(values.detail_id, values.new_price);
          setOpen(false);
        } else {
          enqueueSnackbar('Algo salió mal', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar(error, { variant: 'error' });
        setErrors(error);

      }
    }

  });

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
  };
  const { errors, values, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (

    <>
      <MIconButton onClick={handleClickOpen}>
        <EditIcon />
      </MIconButton>
      <Dialog open={open} onClose={handleClose}>
        <FormikProvider value={formik}>
          <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
            <DialogTitle> {product.name}</DialogTitle>
            <DialogContent>
              <TextField
                label='Precio'
                variant='outlined'
                color='primary'
                fullWidth
                sx={{ mb: 3 }}
                required
                value={values.new_price}
                {...getFieldProps('new_price')}
                error={Boolean(touched.new_price && errors.new_price)}
                helperText={touched.new_price && errors.new_price}
              />
            </DialogContent>
            <DialogActions>
              <Button color='inherit' onClick={handleClose}>
                Cancelar
              </Button>
              <LoadingButton
                pending={isSubmitting}
                type='submit'
                variant='contained'>
                Aceptar
              </LoadingButton>
            </DialogActions>
          </Form>
        </FormikProvider>
      </Dialog>
    </>
  );
}
