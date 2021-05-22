import { sum } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import {
  Box,
  Grid,
  Card,
  Button,
  CardHeader,
  Typography
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import Scrollbar from '../../Scrollbar';
import EmptyContent from '../../EmptyContent';
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';

// ----------------------------------------------------------------------

CheckoutCart.propTypes = {
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

export default function CheckoutCart({
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
  const totalItems = sum(values.products.map((item) => item.quantity));

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Card
                    <Typography
                      component="span"
                      sx={{ color: 'text.secondary' }}
                    >
                      &nbsp;({totalItems} item)
                    </Typography>
                  </Typography>
                }
                sx={{ mb: 3 }}
              />

              {!isEmptyCart ? (
                <Scrollbar>
                  <CheckoutProductList
                    formik={formik}
                    onDelete={onDelete}
                    onIncreaseQuantity={onIncreaseQuantity}
                    onDecreaseQuantity={onDecreaseQuantity}
                  />
                </Scrollbar>
              ) : (
                <EmptyContent
                  title="Cart is empty"
                  description="Look like you have no items in your shopping cart."
                  img="/static/illustrations/illustration_empty_cart.svg"
                />
              )}
            </Card>

            <Box sx={{ mt: 3 }}>
              <Button
                color="inherit"
                component={RouterLink}
                to={PATH_DASHBOARD.eCommerce.root}
                startIcon={<Icon icon={arrowIosBackFill} />}
              >
                Continue Shopping
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutSummary
              total={total}
              enableDiscount
              discount={discount}
              subtotal={subtotal}
              onApplyDiscount={onApplyDiscount}
            />
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={values.products.length === 0}
            >
              Check Out
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
