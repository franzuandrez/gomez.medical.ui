import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container
} from '@material-ui/core';

import {
  getCart,
  resetCart,
  deleteCart,
  increaseQuantity,
  decreaseQuantity
} from '../../../../redux/slices/purchasing';
import { PATH_APP } from '../../../../routes/paths';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';

import PurchaseCart from './PurchaseCart';


export default function PurchaseCheckout() {
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const { checkout } = useSelector((state) => state.purchase);
  const {
    cart,
    total
  } = checkout;

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);


  const handleResetCart = () => {
    dispatch(resetCart());
  };

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleIncreaseQuantity = (productId, quantity) => {

    const regExpOnlyNumbers = /^[0-9\b]+$/;
    if (quantity === '' || regExpOnlyNumbers.test(quantity)) {
      console.log(quantity, productId, 'Here');
      dispatch(increaseQuantity({ productId, quantity }));

    }

  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };


  return (
    <Page title='Pedidos: Checkout | Minimal-UI'>
      <Container>
        <HeaderDashboard
          heading='Checkout'
          links={[
            {
              name: 'Ordenes',
              href: PATH_APP.purchasing.orders.root
            },
            {
              name: 'Crear pedido',
              href: PATH_APP.purchasing.orders.newOrder
            },
            { name: 'Checkout' }
          ]}
        />

        <PurchaseCart
          cart={cart}
          total={total}
          onReset={handleResetCart}
          onDelete={handleDeleteCart}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
        />

      </Container>
    </Page>
  );
}
