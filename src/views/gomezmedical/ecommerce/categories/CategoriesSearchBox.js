import { useState } from 'react';


import Autocomplete from '@material-ui/core/Autocomplete';

import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';


import {
  Box, InputAdornment,

  TextField
} from '@material-ui/core';
import SearchNotFound from '../../../../components/SearchNotFound';

import apiCategories from '../../../../services/api/ecommerce/apiCategories';

export default function CategoriesSearchBox(
  {
    onChange,
    error,
    required,
    getFieldProps
  }
) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeSearch = async (event) => {
    try {
      const { value } = event.target;
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
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      onInputChange={handleChangeSearch}
      getOptionSelected={(option, value) => option.product_category_id === value.product_category_id}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={Boolean(loading)}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          {...getFieldProps}
          error={error}
          placeholder='Categoria'
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