import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// utils
import axios from 'axios';

const initialState = {
  status: 'idle',
  error: null,
  errorList: [],
  warehouses: [],
  warehouse: null

};


export const fetchWarehouses = createAsyncThunk('warehouses/fetchWarehouses', async () => {


  const url = `${process.env.REACT_APP_BASE_URL}v1/warehouses`;
  const response = await axios.get(url);

  return response.data.data;


});

export const addNewWarehouse = createAsyncThunk('warehouses/addNewWarehouse',
  async initialWarehouse => {

    const url = `${process.env.REACT_APP_BASE_URL}v1/warehouses`;

    const response = await axios.post(url, initialWarehouse);

    return response.data.data;
  }
);


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
      state.error = true;
      state.errorList.push(action.payload);
    },

    warehouseAdded(state, action) {
      state.isLoading = false;
      state.warehouses.push(action.payload);
    },


    getWarehousesInitial(state, action) {
      state.isLoading = false;
      state.warehouses = action.payload;
    }


  },
  extraReducers: {
    [fetchWarehouses.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchWarehouses.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.warehouses = state.warehouses.concat(action.payload);
    },
    [fetchWarehouses.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addNewWarehouse.fulfilled]: (state, action) => {
      state.warehouses.push(action.payload);
    }
  }
});

// Reducer
export default slice.reducer;



