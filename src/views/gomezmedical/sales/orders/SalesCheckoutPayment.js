import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Grid, Button } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
//
import SalesCheckoutSummary from './SalesCheckoutSummary';
import SalesCheckoutBillingInfo from './SalesCheckoutBillingInfo';
import SalesCheckoutPaymentMethods from './SalesCheckoutPaymentMethods';
import apiSales from '../../../../services/api/sales/apiSales';
import { addOrder } from '../../../../redux/slices/sales';


const PAYMENT_OPTIONS = [
  {
    value: 'cash',
    title: 'Efectivo',
    description: 'Pago con efectivo en tienda',
    icons: []
  },
  {
    value: 'credit',
    title: 'Crédito',
    description: 'Queda al credito',
    icons: []
  }
];

const CARDS_OPTIONS = [
  { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
  { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
  { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' }
];

SalesCheckoutPayment.propTypes = {
  total: PropTypes.number,
  subtotal: PropTypes.number,
  billing: PropTypes.object,
  discount: PropTypes.number,
  shipping: PropTypes.number,
  onBackStep: PropTypes.func,
  onComplete: PropTypes.func,
  onGotoStep: PropTypes.func,
  onApplyShipping: PropTypes.func
};

export default function SalesCheckoutPayment({
                                               total,
                                               subtotal,
                                               billing,
                                               discount,
                                               shipping,
                                               onBackStep,
                                               onComplete,
                                               onGotoStep,
                                               onApplyShipping
                                             }) {
  const PaymentSchema = Yup.object().shape({
    payment: Yup.mixed().required('EL pago es requerido')
  });
  const dispatch = useDispatch();
  const { checkout } = useSelector((state) => state.sales);
  const { customer } = useSelector((state) => state.customer);

  const formik = useFormik({
    initialValues: {
      delivery: shipping,
      payment: '',
      customer,
      products: checkout
    },
    validationSchema: PaymentSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {

        const result = await apiSales.post(values);
        dispatch(addOrder(result));
        onComplete();
        setSubmitting(true);

      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error.message);
      }
    }
  });

  const { isSubmitting, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <SalesCheckoutPaymentMethods
              formik={formik}
              cardOptions={CARDS_OPTIONS}
              paymentOptions={PAYMENT_OPTIONS}
            />
            <Button
              type='button'
              size='small'
              color='inherit'
              onClick={onBackStep}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Regresar
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <SalesCheckoutBillingInfo billing={billing} onBackStep={onBackStep} />
            <SalesCheckoutSummary
              enableEdit
              total={total}
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              onEdit={() => onGotoStep(0)}
            />
            <LoadingButton
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              pending={isSubmitting}
            >
              Completar orden
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}