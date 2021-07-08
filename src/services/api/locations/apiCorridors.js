const { ApiCore } = require('../utilities/Core');

const url = 'v1/corridors';
const plural = 'corridors';
const single = 'corridors';
const nestedResource = 'racks';
// plural and single may be used for message logic if needed in the ApiCore class.

const apiCorridors = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: true,
  patch: true,
  delete: true,
  nested:true,
  url,
  plural,
  single,
  parentResource: url,
  nestedResource
});


export default apiCorridors;