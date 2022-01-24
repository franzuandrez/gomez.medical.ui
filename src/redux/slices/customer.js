import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  isLoading: false,
  error: false,
  customer: null,
  defaultCustomer: null,
  defaultCustomerSelected: false,
  addresses: [],
  emails: [],
  contacts: []
};

const slice = createSlice({
    name: 'customer',
    initialState,
    reducers: {

      resetCustomer(state) {
        state.existsCustomer = false;
        state.customer = null;
        state.addresses = [];
        state.emails = [];
        state.contacts = [];
      },
      startLoading(state) {
        state.isLoading = true;
      },
      hasError(state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },

      addCustomer(state, action) {

        state.customer = action.payload;

        state.addresses = state.customer?.business_entity?.addresses || [];
        state.emails = state.customer?.business_entity?.email_addresses || [];
        state.contacts = state.customer?.business_entity?.phone_numbers || [];
      },

      getCustomer(state, action) {
        const customer = action.payload;
        state.isLoading = false;
        state.customer = customer;
      },
      getAddresses(state, action) {
        state.addresses = action.payload;
      },
      addAddress(state, action) {
        const address = action.payload;
        state.addresses = [...state.addresses, address];
      },
      getEmails(state, action) {
        state.emails = action.payload;
      },
      addDefaultCustomer(state, action) {
        state.defaultCustomer = action.payload;

      },
      setDefaultCustomerSelected(state) {
        state.defaultCustomerSelected = !state.defaultCustomerSelected;
      },
      getDefaultCustomer(state, action) {
        state.defaultCustomer = action.payload;
      },
      addEmail(state, action) {
        const email = action.payload;
        state.emails = [...state.emails, email];
      },
      getContacts(state, action) {
        state.contacts = action.payload;
      },
      addContact(state, action) {
        const contact = action.payload;
        state.contacts = [...state.contacts, contact];

      }

    }
  }
);

export default slice.reducer;

export const {
  addCustomer,
  getCustomer,
  getAddresses,
  addAddress,
  getDefaultCustomer,
  addDefaultCustomer,
  getEmails,
  addEmail,
  getContacts,
  addContact,

  resetCustomer,
  setDefaultCustomerSelected
} = slice.actions;
