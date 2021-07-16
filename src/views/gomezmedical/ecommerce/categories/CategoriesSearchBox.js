import { useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/core/Autocomplete';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import {
  Box,
  InputAdornment,
  TextField
} from '@material-ui/core';
import SearchNotFound from '../../../../components/SearchNotFound';
import apiCategories from '../../../../services/api/ecommerce/apiCategories';


CategoriesSearchBox.propTypes = {
  onChange: PropTypes.func,
  error: PropTypes.bool,
  required: PropTypes.bool,
  getFieldProps: PropTypes.any,
  category: PropTypes.object,
  categories: PropTypes.array
};

export default function CategoriesSearchBox(
  {
    onChange,
    error,
    required,
    getFieldProps,
    category = null,
    categories = []
  }
) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(categories);
  const loading = open && options.length === 0;
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeSearch = async (event) => {
    try {
      const { value } = event ? event.target : '';
      setSearchQuery(value);
      if (value) {
        const response = await apiCategories.getAll(`page=1&query=${value}`);
        const categories = response.data;
        setOptions(Object.keys(categories).map((key) => categories[key]));
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Autocomplete
      id='asynchronous-demo'
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
      getOptionSelected={(option, value) => option.product_category_id === value.product_category_id}
      getOptionLabel={(option) => option.name}
      options={options}
      value={category}
      loading={Boolean(loading)}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          {...getFieldProps}
          error={error}
          placeholder='Buscar Categoria'
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