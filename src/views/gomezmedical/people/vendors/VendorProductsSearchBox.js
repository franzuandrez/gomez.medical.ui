import { useState } from 'react';
import Autocomplete from '@material-ui/core/Autocomplete';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import {
  Box, InputAdornment,
  TextField
} from '@material-ui/core';
import SearchNotFound from '../../../../components/SearchNotFound';

import apiVendorProducts from '../../../../services/api/people/apiVendorProducts';


VendorProductsSearchBox.propTypes = {
  onChange: PropTypes.func,
  error: PropTypes.bool,
  required: PropTypes.bool,
  getFieldProps: PropTypes.any,
  vendor_id: PropTypes.number,
  product: PropTypes.object,
  products: PropTypes.array
};
export default function VendorProductsSearchBox(
  {
    onChange,
    error,
    required,
    getFieldProps,
    vendor_id,
    product = null,
    products = []
  }
) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(products);
  const loading = open && options.length === 0;
  const [searchQuery, setSearchQuery] = useState('');
  const handleChangeSearch = async (event) => {
    try {
      const { value } = event ? event.target : '';
      setSearchQuery(value);
      if (value && vendor_id) {
        const response = await apiVendorProducts.custom(`v1/vendors/${vendor_id}/products?query=${searchQuery}`);
        const products = response.data;
        setOptions(Object.keys(products).map((key) => products[key]));
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}

      onChange={onChange}
      noOptionsText={<SearchNotFound searchQuery={searchQuery ? setSearchQuery.toString() : ''} />}
      onInputChange={handleChangeSearch}
      getOptionSelected={(option, value) => option.product_vendor_id === value.product_vendor_id}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={Boolean(loading)}
      value={product}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          {...getFieldProps}
          error={error}
          placeholder='Buscar Producto'
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                <InputAdornment position='start'>
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{
                      ml: 1,
                      width: 20,
                      height: 20,
                      color: 'text.disabled'
                    }}
                  />
                </InputAdornment>
                {params.InputProps.startAdornment}
              </>
            )
          }}
        />
      )}
    />
  );


}