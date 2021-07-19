import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions, Box, Typography, TextField, DialogContent
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import EditIcon from '@material-ui/icons/Edit';
import { LoadingButton } from '@material-ui/lab';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { MIconButton } from '../../../../components/@material-extend';
import apiVendorProducts from '../../../../services/api/people/apiVendorProducts';


const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm
}));

ModalEditVendorProduct.propTypes = {
  product: PropTypes.object.isRequired,
  vendor_id: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired

};
export default function ModalEditVendorProduct({ product, vendor_id, cost }) {


  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const EditProductVendorSchema = Yup.object().shape({
    cost: Yup.number().required('Costo requerido')

  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cost: cost || ''
    },
    validationSchema: EditProductVendorSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {


      try {
        setSubmitting(true);
        const result = await apiVendorProducts.custom(`v1/vendors/${vendor_id}/products/${product.product_id}`, {
          method: 'patch',
          data: values
        });


        if (result) {
          enqueueSnackbar('Actualizado correctamente', { variant: 'success' });

        } else {
          enqueueSnackbar('Algo salió mal', { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar(error, { variant: 'error' });
        setErrors(error);

    }}

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
              <Box
                sx={{
                  py: 2,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ThumbImgStyle alt={product.name}
                               src={product.images.length > 0 ? product.images[0].path : ''}
                />
                <Typography variant='subtitle2' noWrap>
                  {product.name}
                </Typography>
              </Box>
              <TextField
                label='Costo'
                variant='outlined'
                color='primary'
                fullWidth
                sx={{ mb: 3 }}
                required
                value={values.cost}
                {...getFieldProps('cost')}
                error={Boolean(touched.cost && errors.cost)}
                helperText={touched.cost && errors.cost}
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
