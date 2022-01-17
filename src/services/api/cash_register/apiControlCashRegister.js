const { ApiCore } = require('../utilities/Core');

const url = 'v1/control_cash_register';
const plural = 'control_cash_register';
const single = 'control_cash_register';
const nestedResource = '';
// plural and single may be used for message logic if needed in the ApiCore class.

const apiControlCashRegister = new ApiCore({
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


export default apiControlCashRegister;