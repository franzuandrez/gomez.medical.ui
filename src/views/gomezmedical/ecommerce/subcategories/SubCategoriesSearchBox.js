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
import apiSubcategories from '../../../../services/api/ecommerce/apiSubcategories';


SubCategoriesSearchBox.propTypes = {
  onChange: PropTypes.func,
  error: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  getFieldProps: PropTypes.any,
  subCategory: PropTypes.object,
  subcategories: PropTypes.array
};
export default function SubCategoriesSearchBox(
  {
    onChange,
    error,
    required,
    disabled = false,
    getFieldProps,
    subCategory = undefined,
    subcategories = []
  }
) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(subcategories);
  const loading = open && options.length === 0;
  const [searchQuery, setSearchQuery] = useState('');
  const handleChangeSearch = async (event) => {
    try {
      const { value } = event ? event.target : '';
      setSearchQuery(value);
      if (value) {
        const response = await apiSubcategories.getAll(`page=1&query=${value}`);
        const subcategories = response.data;
        setOptions(Object.keys(subcategories).map((key) => subcategories[key]));
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
      disabled={disabled}
      noOptionsText={<SearchNotFound searchQuery={searchQuery ? setSearchQuery.toString() : ''} />}
      onInputChange={handleChangeSearch}
      getOptionSelected={(option, value) => option.product_subcategory_id === value.product_subcategory_id}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={Boolean(loading)}
      value={subCategory}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          {...getFieldProps}
          error={error}
          placeholder='Buscar Subcategoria'
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