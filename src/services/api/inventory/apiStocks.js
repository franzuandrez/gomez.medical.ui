const { ApiCore } = require('../utilities/Core');

const url = 'v1/stocks';
const plural = 'stocks';
const single = 'stock';
const nestedResource = '';

const apiStocks = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: true,
  patch: true,
  delete: true,
  nested: false,
  url,
  plural,
  single,
  parentResource: url,
  nestedResource,

});


export default apiStocks;