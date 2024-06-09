import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import {
  Box,
  Grid,
  Step,
  Stepper,
  Container,
  StepLabel,
  StepConnector, LinearProgress, Card, CardContent, CardHeader
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
  decreaseQuantity,
  addCart
} from '../../../../redux/slices/sales';
import {
  resetCustomer,
  addDefaultCustomer
} from '../../../../redux/slices/customer';
// routes
import { PATH_APP } from '../../../../routes/paths';
// hooks
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// components
import Page from '../../../../components/Page';

import HeaderDashboard from '../../../../components/HeaderDashboard';
import SalesCheckoutCart from './SalesCheckoutCart';
import SalesCheckoutPayment from './SalesCheckoutPayment';
import SalesCheckoutBillingAddress from './SalesCheckoutBillingAddress';
import SalesCheckoutOrderComplete from './SalesCheckoutOrderComplete';
import apiStocks from '../../../../services/api/inventory/apiStocks';
import apiDefaultCustomer from '../../../../services/api/people/apiDefaultCustomer';
import SalesProductsSearched from './SalesProductsSearched';
import SalesSearchBar from './SalesSearchBar';
// ----------------------------------------------------------------------

const STEPS = ['Productos', 'Facturación', 'Pago'];

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

export default function SalesOrderCreate() {
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();

  const { checkout } = useSelector((state) => state.sales);
  const { defaultCustomer } = useSelector((state) => state.customer);
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
  const [products, setProducts] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [query, setQuery] = useState('');
  const [openProductsList, setOpenProductsList] = useState(false);

  const { isFetching } = useQuery(
    ['stocks', query],
    async () => {
      const result = await apiStocks.getAll(`page=1&query=${query}&only_available_stock=1`);
      const products = result.data;

      if (products.length === 0) {

        setOpenProductsList(false);
      } else if (products.length === 1) {

        setOpenProductsList(false);

        handleAddProduct(products[0]);
        setFilterName('');
        setQuery('');
      } else {
        setOpenProductsList(true);
        setProducts(products);
        setFilterName('');
        setQuery('');
      }

    },
    {
      enabled: !!query,
      keepPreviousData: true,
      refetchIntervalInBackground: false
    }
  );


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

  useEffect(() => {
    if (!defaultCustomer) {
      handleAddDefaultCustomer();
    }
  }, []);

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
    dispatch(resetCustomer());
    history.push(PATH_APP.sales.orders.root);
  };

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleIncreaseQuantity = (productId, quantity) => {
    const regExpOnlyNumbers = /^[0-9\b]+$/;

    if ( regExpOnlyNumbers.test(quantity)) {

        dispatch(increaseQuantity({ productId, quantity}));
    }

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

  const handleAddDefaultCustomer = async () => {
    const result = await apiDefaultCustomer.getAll(`q=?`);
    dispatch(addDefaultCustomer(result));
  };


  const handleAddProduct = (product) => {

    if (product) {
      dispatch(addCart({
        name: product.name,
        cover: product.images[0]?.path,
        color: product.color,
        size: product.size,
        id: product.id,
        product_id: product.product_id,
        bin: product.bin,
        best_before: product.best_before,
        subtotal: product.price.value,
        quantity: 1,
        price: product.price.value,
        available: product.stock,
        batch: product.batch
      }));
    }
  };
  const handleChangeSearchQuery = (event) => {
    setFilterName(event.target.value);

  };


  const onEnter = (e) => {

    if (e.which === 13) {
      setQuery(filterName);
      e.target.select();
    }
  };
  const handleClose = () => {
    setOpenProductsList(false);
  };

  const renderContent = () => {
    if (activeStep === 1) {
      return (
        <SalesCheckoutBillingAddress
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
        <SalesCheckoutPayment
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardHeader
              subheader='Buscar productos'
            />
            <CardContent>
              <SalesSearchBar
                filterName={filterName}
                onEnter={onEnter}
                onFilterName={handleChangeSearchQuery}
              />
              {isFetching &&
              <LinearProgress />
              }
              <SalesProductsSearched
                products={products}
                onAddProduct={handleAddProduct}
                isOpen={openProductsList}
                handleClose={handleClose}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <SalesCheckoutCart
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
        </Grid>
      </Grid>
    );
  };

  return (
    <Page title='Ventas: Checkout | Gomez Medical'>
      <Container>
        <HeaderDashboard
          heading='Checkout'
          links={[
            { name: 'Ventas', href: PATH_APP.sales.orders.root },
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
          <SalesCheckoutOrderComplete
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
