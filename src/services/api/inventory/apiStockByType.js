const { ApiCore } = require('../utilities/Core');

const url = 'v1/stock_by_type';
const plural = 'stock_by_type';
const single = 'stock_by_type';
const nestedResource = '';

const apiStockByType = new ApiCore({
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


export default apiStockByType;