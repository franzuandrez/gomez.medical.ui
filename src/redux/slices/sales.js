import { filter, map, sum, uniqBy } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  isLoading: false,
  error: false,
  products: [],
  product: null,
  order: null,
  checkout: {
    customer: null,
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null
  }
};

const slice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    addOrder(state, action) {
      state.order = action.payload;
    },
    getOrder(state, action) {
      state.order = action.payload;
    },
    addCustomer(state, action) {
      const customer = action.payload;
      const isAdded = state.checkout.customer !== null;
      if (!isAdded) {
        state.checkout.customer = customer;
      }
    },
    getCustomer(state, action) {
      state.checkout.customer = action.payload;
    },
    getCart(state, action) {
      const cart = action.payload;

      const subtotal = sum(
        cart.map((product) => product.price * product.quantity)
      );
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    addCart(state, action) {
      const product = action.payload;
      const isEmptyCart = state.checkout.cart.length === 0;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, product];
      } else {
        state.checkout.cart = map(state.checkout.cart, (_product) => {
          const isExisted = _product.id === product.id;
          if (isExisted) {
            return {
              ..._product,
              quantity: _product.quantity + 1
            };
          }
          return _product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, product], 'id');
    },

    deleteCart(state, action) {
      state.checkout.cart = filter(
        state.checkout.cart,
        (item) => item.id !== action.payload
      );
    },

    resetCart(state) {
      state.checkout.customer = null;
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;

    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      state.checkout.activeStep = action.payload;
    },

    increaseQuantity(state, action) {
      const { productId, quantity } = action.payload;


      state.checkout.cart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {

          const newQuantity = (typeof quantity === 'undefined' || quantity === 1) ? (product.quantity + 1) : quantity;
          return {
            ...product,
            quantity: newQuantity
          };
        }
        return product;
      });
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      state.checkout.cart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1
          };
        }
        return product;
      });
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total =
        state.checkout.subtotal - state.checkout.discount + shipping;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  addCustomer,
  getCustomer,
  addOrder

} = slice.actions;