import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// utils
import axios from 'axios';

const initialState = {
  status: 'idle',
  error: null,
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


export const updateWarehouse = createAsyncThunk('warehouses/updateWarehouse',
  async (initialWarehouse) => {

    const url = `${process.env.REACT_APP_BASE_URL}v1/warehouses/${initialWarehouse.warehouseId}`;

    const response = await axios.patch(url, initialWarehouse);

    return response.data.data;
  }
  )
;

export const deleteWarehouse = createAsyncThunk('warehouses/deleteWarehouse',
  async ({ itemId }) => {

    const url = `${process.env.REACT_APP_BASE_URL}v1/warehouses/${itemId}`;

    await axios.delete(url);

    return { itemId };
  }
);

export const fetchWarehouseById = createAsyncThunk('warehouses/selectWarehouseById',
  async ({ warehouseId }) => {

    const url = `${process.env.REACT_APP_BASE_URL}v1/warehouses/${warehouseId}`;

    const response = await axios.get(url);
    return response.data.data;
  });


const slice = createSlice({
  name: 'warehouse',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWarehouses.pending]: (state) => {
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

    },
    [fetchWarehouseById.fulfilled]: (state, action) => {
      state.warehouse = action.payload;

    },
    [updateWarehouse.fulfilled]: (state, action) => {

      const { warehouse_id, name } = action.payload;
      const existingWarehouse = state.warehouses.find(warehouse => warehouse.warehouse_id === warehouse_id);
      if (existingWarehouse) {
        existingWarehouse.name = name;
      }

    },
    [deleteWarehouse.fulfilled]: (state, action) => {
      const { itemId } = action.payload;
      state.warehouses = state.warehouses.filter(warehouse => warehouse.warehouse_id !== itemId);

    }
  }
});

// Reducer
export default slice.reducer;




