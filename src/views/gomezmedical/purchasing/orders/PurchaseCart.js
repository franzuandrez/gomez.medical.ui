import { sum } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';

import {
  Box,
  Grid,
  Card,
  Button,
  CardHeader,
  Typography
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@material-ui/lab';
import { PATH_APP } from '../../../../routes/paths';
import Scrollbar from '../../../../components/Scrollbar';
import EmptyContent from '../../../../components/EmptyContent';
import PurchaseCheckoutProductList from './PurchaseCheckoutProductList';
import PurchaseCheckoutVendorInfo from './PurchaseCheckoutVendorInfo';
import apiPurchase from '../../../../services/api/purchasing/apiPurchase';

// ----------------------------------------------------------------------

PurchaseCart.propTypes = {
  cart: PropTypes.array,
  total: PropTypes.number,
  onDelete: PropTypes.func,
  onReset: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
  onDecreaseQuantity: PropTypes.func

};

export default function PurchaseCart({
                                       cart,
                                       total,
                                       onDelete,
                                       onReset,
                                       onIncreaseQuantity,
                                       onDecreaseQuantity
                                     }) {
  const isEmptyCart = cart.length === 0;
  const vendor = isEmptyCart ? null : cart[0].vendor;
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      products: cart,
      vendor
    },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setSubmitting(true);
        const result = await apiPurchase.post(values);
        if (result) {
          onReset();
          enqueueSnackbar('Creado  correctamente', { variant: 'success' });
        } else {
          enqueueSnackbar(result.message, { variant: 'error' });
        }
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error.message);
      }
    }
  });

  const { values, handleSubmit, isSubmitting } = formik;
  const totalItems = sum(values.products.map((item) => parseInt(item.quantity, 10)));

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader
                title={
                  <Typography variant='h6'>
                    Verificación
                    <Typography
                      component='span'
                      sx={{ color: 'text.secondary' }}
                    >
                      &nbsp;({totalItems} productos)
                    </Typography>
                  </Typography>
                }
                sx={{ mb: 3 }}
              />

              {!isEmptyCart ? (
                <Scrollbar>
                  <PurchaseCheckoutProductList
                    formik={formik}
                    onDelete={onDelete}
                    onIncreaseQuantity={onIncreaseQuantity}
                    onDecreaseQuantity={onDecreaseQuantity}
                  />
                </Scrollbar>
              ) : (
                <EmptyContent
                  title='Pedido en blanco'
                  description='No hay productos agregados'
                  img='/static/illustrations/illustration_empty_cart.svg'
                />
              )}
            </Card>

            <Box sx={{ mt: 3 }}>
              <Button
                color='inherit'
                component={RouterLink}
                to={PATH_APP.purchasing.orders.newOrder}
                startIcon={<Icon icon={arrowIosBackFill} />}
              >
                Continuar
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <PurchaseCheckoutVendorInfo
              vendor={vendor}
              total={total}
            />
            <LoadingButton
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              pending={isSubmitting}
              disabled={values.products.length === 0}
            >
              Confirmar
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
