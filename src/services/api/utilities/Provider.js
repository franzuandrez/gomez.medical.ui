import axios from 'axios';
import { handleResponse, handleError } from './Response';

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;
/** @param {string} resource */
const getAll = (resource, query = '') =>
  axios
    .get(`${BASE_URL}${resource}?${query}`)
    .then(handleResponse);



/** @param {string} resource */
/** @param {string} id */
const getSingle = (resource, id) =>
  axios
    .get(`${BASE_URL}${resource}/${id}`)
    .then(handleResponse)
    .catch(handleError);


/** @param {string} resource */
/** @param {object} model */
const post = (resource, model) =>
  axios
    .post(`${BASE_URL}${resource}`, model)
    .then(handleResponse)
    ;

/** @param {string} resource */
/** @param {object} model */
const put = (resource, model, id) =>
  axios
    .put(`${BASE_URL}${resource}/${id}`, model)
    .then(handleResponse)
   ;


/** @param {string} resource */
/** @param {object} model */
const patch = (resource, model, id) => axios
  .patch(`${BASE_URL}${resource}/${id}`, model)
  .then(handleResponse)
  ;


/** @param {string} resource */
/** @param {string} id */
const remove = (resource, id) => axios
  .delete(`${BASE_URL}${resource}/${id}`)
  .then(handleResponse)
  ;


const nested = (parentResource, nestedResource, id, query = '') =>
  axios
    .get(`${BASE_URL}${parentResource}/${id}/${nestedResource}?${query}`)
    .then(handleResponse)
    .catch(handleError);

const custom = (url, config) => axios(`${BASE_URL}${url}`, config)
  .then(handleResponse)
  .catch(handleError);



export const apiProvider = {
  getAll,
  getSingle,
  post,
  put,
  patch,
  remove,
  nested,
  custom
};