export function handleResponse(response) {
  if (response.results) {
    return response.results;
  }

  if (response.data.data) {
    return response.data.data;
  }

  return response;
}

export function handleError(error) {

  if (error.data) {
    return error.data;
  }
  if (error.response) {
    return error.response;
  }

  return error;
}