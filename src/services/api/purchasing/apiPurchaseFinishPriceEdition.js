const { ApiCore } = require('../utilities/Core');

const url = 'v1/purchase_header_finish_price_edition';
const plural = 'purchase_header_finish_price_edition';
const single = 'purchase_header_finish_price_edition';
const nestedResource = '';

const apiPurchaseFinishPriceEdition = new ApiCore({
  getAll: false,
  getSingle: false,
  post:false,
  put: false,
  patch: true,
  delete: false,
  nested: false,
  url,
  plural,
  single,
  parentResource: url,
  nestedResource,
});


export default apiPurchaseFinishPriceEdition;