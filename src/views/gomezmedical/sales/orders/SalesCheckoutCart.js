import { sum } from 'lodash';
import PropTypes from 'prop-types';
import { useFormik, Form, FormikProvider } from 'formik';
import useKeyboardShortcut from 'use-keyboard-shortcut';
import {

  Grid,
  Card,
  Button,
  CardHeader,
  Typography
} from '@material-ui/core';

//
import Scrollbar from '../../../../components/Scrollbar';
import EmptyContent from '../../../../components/EmptyContent';

import SalesCheckoutProductList from './SalesCheckoutProductList';
import SalesCheckoutSummary from './SalesCheckoutSummary';
// ----------------------------------------------------------------------

SalesCheckoutCart.propTypes = {
  cart: PropTypes.array,
  total: PropTypes.number,
  subtotal: PropTypes.number,
  discount: PropTypes.number,
  onDelete: PropTypes.func,
  onNextStep: PropTypes.func,
  onApplyDiscount: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
  onDecreaseQuantity: PropTypes.func
};

export default function SalesCheckoutCart({
                                            cart,
                                            total,
                                            subtotal,
                                            discount,
                                            onDelete,
                                            onNextStep,
                                            onApplyDiscount,
                                            onIncreaseQuantity,
                                            onDecreaseQuantity
                                          }) {
  const isEmptyCart = cart.length === 0;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { products: cart },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setSubmitting(true);
        onNextStep();
      } catch (error) {
        console.error(error);
        setErrors(error.message);
      }
    }
  });

  const { values, handleSubmit } = formik;
  const totalItems = sum(values.products.map((item) => parseInt(item.quantity, 10)));
  useKeyboardShortcut(['control', 'enter'], () => !isEmptyCart && handleSubmit(), { overrideSystem: false });
  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader
                title={
                  <Typography variant='h6'>
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
                  <SalesCheckoutProductList
                    formik={formik}
                    onDelete={onDelete}
                    onIncreaseQuantity={onIncreaseQuantity}
                    onDecreaseQuantity={onDecreaseQuantity}
                  />
                </Scrollbar>
              ) : (
                <EmptyContent
                  title='Orden en blanco'
                  description='Parce que no has agregado productos a la orden'
                  img='/static/illustrations/illustration_empty_cart.svg'
                />
              )}
            </Card>


          </Grid>

          <Grid item xs={12} md={4}>
            <SalesCheckoutSummary
              total={total}
              discount={discount}
              subtotal={subtotal}
              onApplyDiscount={onApplyDiscount}
            />
            <Button
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              disabled={values.products.length === 0}
            >
              Confirmar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
