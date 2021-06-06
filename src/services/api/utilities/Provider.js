import axios from 'axios';
import { handleResponse, handleError } from './Response';

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = process.env.REACT_APP_BASE_URL;

/** @param {string} resource */
const getAll = (resource, page = 1) =>
  axios
    .get(`${BASE_URL}${resource}?page=${page}`)
    .then(handleResponse)
    .catch(handleError);


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
    .catch(handleError);

/** @param {string} resource */
/** @param {object} model */
const put = (resource, model, id) =>
  axios
    .put(`${BASE_URL}${resource}/${id}`, model)
    .then(handleResponse)
    .catch(handleError);


/** @param {string} resource */
/** @param {object} model */
const patch = (resource, model, id) => axios
  .patch(`${BASE_URL}${resource}/${id}`, model)
  .then(handleResponse)
  .catch(handleError);


/** @param {string} resource */
/** @param {string} id */
const remove = (resource, id) => axios
  .delete(`${BASE_URL}${resource}/${id}`)
  .then(handleResponse)
  .catch(handleError);


const nested = (parentResource, nestedResource, id) =>
  axios
    .get(`${BASE_URL}${parentResource}/${id}/${nestedResource}`)
    .then(handleResponse)
    .catch(handleError);

export const apiProvider = {
  getAll,
  getSingle,
  post,
  put,
  patch,
  remove,
  nested
};