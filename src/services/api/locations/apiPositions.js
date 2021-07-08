const { ApiCore } = require('../utilities/Core');

const url = 'v1/positions';
const plural = 'positions';
const single = 'position';
const nestedResource = 'bins';

// plural and single may be used for message logic if needed in the ApiCore class.

const apiPositions = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: true,
  patch: true,
  delete: true,
  nested: true,
  url,
  plural,
  single,
  parentResource: url,
  nestedResource
});


export default apiPositions;