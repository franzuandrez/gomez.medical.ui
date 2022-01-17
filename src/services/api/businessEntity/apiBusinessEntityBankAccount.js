const { ApiCore } = require('../utilities/Core');

const url = 'v1/business_entity_banks';
const plural = 'business_entity_banks';
const single = 'business_entity_banks';
const nestedResource = '';
// plural and single may be used for message logic if needed in the ApiCore class.

const apiBusinessEntityBankAccount = new ApiCore({
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


export default apiBusinessEntityBankAccount;