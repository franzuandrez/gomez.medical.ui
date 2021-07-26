import { sum, map, filter, uniqBy } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  isLoading: false,
  error: false,
  products: [],
  product: null,
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0
  }
};


const slice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      // START LOADING
      startLoading(state) {
        state.isLoading = true;
      },

      hasError(state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },


      getCart(state, action) {
        const cart = action.payload;

        const subtotal = sum(
          cart.map((product) => product.price * product.quantity)
        );


        state.checkout.cart = cart;
        state.checkout.subtotal = subtotal;
        state.checkout.total = subtotal;
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
        const updateCart = filter(
          state.checkout.cart,
          (item) => item.id !== action.payload
        );

        state.checkout.cart = updateCart;
      },

      resetCart(state) {
        state.checkout.activeStep = 0;
        state.checkout.cart = [];
        state.checkout.total = 0;
        state.checkout.subtotal = 0;

      },

      onBackStep(state) {
        state.checkout.activeStep -= 1;
      },

      onNextStep(state) {
        state.checkout.activeStep += 1;
      },

      onGotoStep(state, action) {
        const goToStep = action.payload;
        state.checkout.activeStep = goToStep;
      },

      increaseQuantity(state, action) {
        const productId = action.payload;
        const updateCart = map(state.checkout.cart, (product) => {
          if (product.id === productId) {
            return {
              ...product,
              quantity: product.quantity + 1
            };
          }
          return product;
        });

        state.checkout.cart = updateCart;
      },

      decreaseQuantity(state, action) {
        const productId = action.payload;
        const updateCart = map(state.checkout.cart, (product) => {
          if (product.id === productId) {
            return {
              ...product,
              quantity: product.quantity - 1
            };
          }
          return product;
        });

        state.checkout.cart = updateCart;
      }
    }
  }
);

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
  increaseQuantity,
  decreaseQuantity
} = slice.actions;