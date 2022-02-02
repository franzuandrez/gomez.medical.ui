import { useState } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import {
  FormControl, FormHelperText, InputLabel, MenuItem

} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import apiPaymentType from '../../../services/api/payment_type/apiPaymentType';


PaymentTypesSearchBox.propTypes = {
  handleChangePaymentType: PropTypes.func,
  required: PropTypes.bool,
  formik: PropTypes.object
};

export default function PaymentTypesSearchBox(
  {
    handleChangePaymentType,
    required,
    formik
  }
) {

  const { getFieldProps, touched, errors } = formik;

  const [paymentTypes, setPaymentTypes] = useState([]);
  useQuery('payment_types', async () => {
    const result = await apiPaymentType.getAll();
    setPaymentTypes(result.data);
    return result;

  });

  


  return (
    <>
      <FormControl
        fullWidth
        error={Boolean(touched.payment_type_id && errors.payment_type_id)}
      >
        <InputLabel>Forma de pago</InputLabel>
        <Select
          required={required}
          fullWidth
          sx={{ mb: 3 }}
          {...getFieldProps('payment_type_id')}
          onChange={handleChangePaymentType}
        >
          {
            paymentTypes && paymentTypes.map(type =>
              <MenuItem key={`payment_type-${type.id}`} value={type.id}>
                {type.name}
              </MenuItem>
            )
          }
        </Select>
        <FormHelperText>  {touched.payment_type_id && errors.payment_type_id}</FormHelperText>
      </FormControl>
    </>
  );


}