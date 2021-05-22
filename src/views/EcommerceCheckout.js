import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import {
  Box,
  Grid,
  Step,
  Stepper,
  Container,
  StepLabel,
  StepConnector
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// redux
import {
  getCart,
  resetCart,
  onGotoStep,
  deleteCart,
  onBackStep,
  onNextStep,
  applyDiscount,
  applyShipping,
  createBilling,
  increaseQuantity,
  decreaseQuantity
} from '../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// hooks
import useIsMountedRef from '../hooks/useIsMountedRef';
// components
import Page from '../components/Page';
import HeaderDashboard from '../components/HeaderDashboard';
import {
  CheckoutCart,
  CheckoutPayment,
  CheckoutOrderComplete,
  CheckoutBillingAddress
} from '../components/e-commerce/checkout';

// ----------------------------------------------------------------------

const STEPS = ['Cart', 'Billing & address', 'Payment'];

const QontoConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)'
  },
  active: {
    '& $line': { borderColor: theme.palette.primary.main }
  },
  completed: {
    '& $line': { borderColor: theme.palette.primary.main }
  },
  line: {
    borderTopWidth: 2,
    borderColor: theme.palette.divider
  }
}))(StepConnector);

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool
};

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'divider',
        bgcolor: 'background.default'
      }}
    >
      {completed ? (
        <Box
          component={Icon}
          icon={checkmarkFill}
          sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }}
        />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor'
          }}
        />
      )}
    </Box>
  );
}

export default function EcommerceCheckout() {
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();
  const { checkout } = useSelector((state) => state.product);
  const {
    cart,
    total,
    billing,
    discount,
    subtotal,
    shipping,
    activeStep
  } = checkout;
  const isComplete = activeStep === STEPS.length;

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  useEffect(() => {
    if (activeStep === 1) {
      dispatch(createBilling(null));
    }
  }, [dispatch, activeStep]);

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  const handleResetStep = () => {
    dispatch(resetCart());
    history.push(PATH_DASHBOARD.eCommerce.shop);
  };

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleApplyDiscount = (value) => {
    dispatch(applyDiscount(value));
  };

  const handleApplyShipping = (value) => {
    dispatch(applyShipping(value));
  };

  const handleCreateBilling = (value) => {
    dispatch(createBilling(value));
  };

  const renderContent = () => {
    if (activeStep === 1) {
      return (
        <CheckoutBillingAddress
          cart={cart}
          total={total}
          subtotal={subtotal}
          discount={discount}
          onBackStep={handleBackStep}
          onNextStep={handleNextStep}
          onCreateBilling={handleCreateBilling}
        />
      );
    }
    if (activeStep === 2 && billing) {
      return (
        <CheckoutPayment
          total={total}
          billing={billing}
          subtotal={subtotal}
          discount={discount}
          shipping={shipping}
          onBackStep={handleBackStep}
          onComplete={handleNextStep}
          onGotoStep={handleGotoStep}
          onApplyShipping={handleApplyShipping}
        />
      );
    }
    return (
      <CheckoutCart
        cart={cart}
        total={total}
        subtotal={subtotal}
        discount={discount}
        onNextStep={handleNextStep}
        onDelete={handleDeleteCart}
        onApplyDiscount={handleApplyDiscount}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
      />
    );
  };

  return (
    <Page title="Ecommerce: Checkout | Minimal-UI">
      <Container>
        <HeaderDashboard
          heading="Checkout"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root
            },
            { name: 'Checkout' }
          ]}
        />

        <Grid container justifyContent={isComplete ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<QontoConnector />}
            >
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{
                      '& .MuiStepLabel-label': {
                        typography: 'subtitle2',
                        color: 'text.disabled'
                      }
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>

        {isComplete ? (
          <CheckoutOrderComplete
            isComplete={isComplete}
            onReset={handleResetStep}
          />
        ) : (
          renderContent()
        )}
      </Container>
    </Page>
  );
}
