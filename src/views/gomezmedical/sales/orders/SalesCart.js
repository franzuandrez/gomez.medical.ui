
import PropTypes from 'prop-types';

import { useFormik, Form, FormikProvider } from 'formik';

import {
  Grid,
  Card,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@material-ui/lab';
import EmptyContent from '../../../../components/EmptyContent';
import apiSales from '../../../../services/api/sales/apiSales';
import SalesCheckoutProductList from './SalesCheckoutProductList';


SalesCart.propTypes = {
  cart: PropTypes.array,
  onDelete: PropTypes.func,
  onReset: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  customer: PropTypes.object
};

export default function SalesCart({
                                    cart,
                                    onDelete,
                                    onReset,
                                    onIncreaseQuantity,
                                    onDecreaseQuantity,
                                    customer
                                  }) {
  const isEmptyCart = cart.length === 0;

  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      products: cart,
      customer
    },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setSubmitting(true);
        const result = await apiSales.post(values);
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

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>

              {!isEmptyCart ? (
                <SalesCheckoutProductList
                  formik={formik}
                  onDecreaseQuantity={onDecreaseQuantity}
                  onDelete={onDelete}
                  onIncreaseQuantity={onIncreaseQuantity}
                />
              ) : (
                <EmptyContent
                  title='Orden en blanco'
                  description='No hay productos agregados'
                  img='/static/illustrations/illustration_empty_cart.svg'
                />
              )}
            </Card>


          </Grid>

          <Grid item xs={12} md={4}>

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
