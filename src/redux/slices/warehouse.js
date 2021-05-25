import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from 'axios';

const initialState = {
  isLoading: false,
  error: false,
  warehouses: [],
  warehouse: null

};

const slice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },


    warehouseAdded(state, action) {
      state.isLoading = false;
      state.warehouses.push(action.payload);
    },

    getWarehousesInitial(state, action) {
      state.isLoading = false;
      state.warehouses = action.payload;
    }


  }
});

// Reducer
export default slice.reducer;


// ----------------------------------------------------------------------


export const { hasError } = slice.actions
// ----------------------------------------------------------------------

export function getWarehouses() {

  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `${process.env.REACT_APP_BASE_URL}v1/warehouses`;
      const response = await axios.get(url);


      dispatch(slice.actions.getWarehousesInitial(response.data.data));


    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


export function saveWarehouse({ name }) {

  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const url = `${process.env.REACT_APP_BASE_URL}v1/warehouses`;
      const response = await axios.post(url, {
        name
      });

      dispatch(slice.actions.warehouseAdded(response.data.data));


    } catch (error) {

      dispatch(slice.actions.hasError(error));
    }
  };

}


