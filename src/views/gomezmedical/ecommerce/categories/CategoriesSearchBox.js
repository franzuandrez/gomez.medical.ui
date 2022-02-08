import {  useState } from 'react';
import { useQuery } from 'react-query';
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
  disabled: PropTypes.bool,
  getFieldProps: PropTypes.any,
  category: PropTypes.object,
  categories: PropTypes.array
};

export default function CategoriesSearchBox(
  {
    onChange,
    error,
    required,
    disabled = false,
    getFieldProps,
    category = undefined,
    categories = []
  }
) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(categories);

  const [searchQuery, setSearchQuery] = useState('');

  const { isLoading } = useQuery(
    ['categories', searchQuery],
    async () => {
      const result = await apiCategories.getAll(`page=1&query=${searchQuery}`);
      const categories = result.data;
      setOptions(Object.keys(categories).map((key) => categories[key]));
    },
    {
      enabled: !!searchQuery,
      keepPreviousData: true
    }
  );

  const handleChangeSearch = async (event) => {
    try {
      const { value } = event ? event.target : '';
      setSearchQuery(value);
      if (!value) {
        setOptions([]);
      }
    } catch (error) {
      console.error(error);
      setOptions([]);
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
      disabled={disabled}
      onChange={onChange}
      noOptionsText={<SearchNotFound searchQuery={searchQuery ? searchQuery.toString() : ''} />}
      onInputChange={handleChangeSearch}
      getOptionSelected={(option, value) => option.product_category_id === value.product_category_id}
      getOptionLabel={(option) => option.name}
      options={options}
      defaultValue={category}
      loading={Boolean(isLoading)}
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