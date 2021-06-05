import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// utils
import axios from 'axios';

const initialState = {
  status: 'idle',
  error: null,
  sections: [],
  section: null

};


export const fetchSections = createAsyncThunk('sections/fetchSections', async () => {


  const url = `${process.env.REACT_APP_BASE_URL}v1/sections`;
  const response = await axios.get(url);

  return response.data.data;


});

export const addNewSection = createAsyncThunk('sections/addNewSection',
  async initialSection => {

    const url = `${process.env.REACT_APP_BASE_URL}v1/sections`;

    const response = await axios.post(url, initialSection);

    return response.data.data;
  }
);


export const updateSection = createAsyncThunk('sections/updateSection',
  async (initialSection) => {

    const url = `${process.env.REACT_APP_BASE_URL}v1/sections/${initialSection.sectionId}`;

    const response = await axios.patch(url, initialSection);

    return response.data.data;
  }
  )
;

export const deleteSection = createAsyncThunk('sections/deleteSection',
  async ({ itemId }) => {

    const url = `${process.env.REACT_APP_BASE_URL}v1/sections/${itemId}`;

    await axios.delete(url);

    return { itemId };
  }
);

export const fetchSectionById = createAsyncThunk('sections/fetchSectionById',
  async ({ sectionId }) => {

    const url = `${process.env.REACT_APP_BASE_URL}v1/sections/${sectionId}`;

    const response = await axios.get(url);
    return response.data.data;
  });


const slice = createSlice({
  name: 'section',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSections.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchSections.fulfilled]: (state, action) => {

      state.status = 'succeeded';
      state.sections = state.sections.concat(action.payload);

    },
    [fetchSections.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addNewSection.fulfilled]: (state, action) => {
      state.sections.push(action.payload);

    },
    [fetchSectionById().fulfilled]: (state, action) => {
      state.section = action.payload;

    },
    [updateSection.fulfilled]: (state, action) => {

      const { section_id, warehouse_id, name } = action.payload;
      const existingSection = state.section.find(section => section.section_id === section_id);
      if (existingSection) {
        existingSection.name = name;
        existingSection.warehouse_id = warehouse_id;
      }

    },
    [deleteSection.fulfilled]: (state, action) => {
      const { itemId } = action.payload;
      state.sections = state.sections.filter(section => section.section_id !== itemId);

    }
  }
});

// Reducer
export default slice.reducer;




