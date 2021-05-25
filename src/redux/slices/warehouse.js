import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from 'axios';

const initialState = {
  isLoading: false,
  error: false,
  warehouses: [],
  post: null,

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

    // GET warehouses
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.warehouses = action.payload;
    },

    // GET POST INFINITE
    getWarehousesInitial(state, action) {
      state.isLoading = false;
      state.warehouses = action.payload;
    },


  }
});

// Reducer
export default slice.reducer;



// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export function getWarehouses() {

  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('http://localhost:8000/api/v1/warehouses');


      dispatch(slice.actions.getWarehousesInitial(response.data.data));


    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

