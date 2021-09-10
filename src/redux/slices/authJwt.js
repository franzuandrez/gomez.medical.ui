import { createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
import apiLogin from '../../services/api/user/apiLogin';
import apiUser from '../../services/api/user/apiUser';
import apiLogout from '../../services/api/user/apiLogout';


// ----------------------------------------------------------------------
const BASE_URL = process.env.REACT_APP_BASE_URL;
const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {}
};

const slice = createSlice({
  name: 'authJwt',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // INITIALISE
    getInitialize(state, action) {
      state.isLoading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;

    },

    // LOGIN
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    // REGISTER
    registerSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    // LOGOUT
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
    }
  }
});

// Reducer
export default slice.reducer;


const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ----------------------------------------------------------------------

export function login({ email, password }) {
  return async (dispatch) => {


    await axios.get(`${BASE_URL.replace('/api/', '')}/sanctum/csrf-cookie`, {});
    const response_login = await apiLogin.post({
      email,
      password
    });


    if (response_login.status === 200) {
      const { token } = response_login.data;
      setSession(token);
      const response_user = await apiUser.getAll();
      dispatch(slice.actions.loginSuccess({
        displayName: response_user?.name,
        ...response_user
      }));
    } else {
      await Promise.reject(response_login.data);
    }


  };
}


export function logout() {
  return async (dispatch) => {
    await apiLogout.post();
    setSession(null);
    dispatch(slice.actions.logoutSuccess());
  };
}

// ----------------------------------------------------------------------

export function getInitialize() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const accessToken = window.localStorage.getItem('accessToken');

      if (accessToken) {
        setSession(accessToken);
        const response = await apiUser.getAll();

        if (!response.status) {
          dispatch(
            slice.actions.getInitialize({
              isAuthenticated: true,
              user: response
            })
          );
        } else {
          setSession(null);
          dispatch(
            slice.actions.getInitialize({
              isAuthenticated: false,
              user: null
            })
          );
        }

      } else {
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: false,
            user: null
          })
        );
      }
    } catch (error) {

      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
    }
  };
}
