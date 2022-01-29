import { useState } from 'react';
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
import SearchNotFound from '../../../components/SearchNotFound';
import apiBrands from '../../../services/api/brand/apiBrand';


BrandsSearchBox.propTypes = {
  onChange: PropTypes.func,
  error: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  getFieldProps: PropTypes.any,
  brand: PropTypes.object,
  brands: PropTypes.array
};

export default function BrandsSearchBox(
  {
    onChange,
    error,
    required,
    disabled = false,
    getFieldProps,
    brand = undefined,
    brands = []
  }
) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(brands);

  const [searchQuery, setSearchQuery] = useState('');

  const { isLoading } = useQuery(
    ['brands', searchQuery],
    async () => {
      const result = await apiBrands.getAll(`page=1&query=${searchQuery}`);
      const brands = result.data;
      setOptions(Object.keys(brands).map((key) => brands[key]));
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
      setOptions([]);
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
      disabled={disabled}
      onChange={onChange}
      noOptionsText={<SearchNotFound searchQuery={searchQuery ? searchQuery.toString() : ''} />}
      onInputChange={handleChangeSearch}
      getOptionSelected={(option, value) => option.brand_id === value.brand_id}
      getOptionLabel={(option) => option.name}
      options={options}
      value={brand}
      loading={Boolean(isLoading)}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          {...getFieldProps}
          error={error}
          placeholder='Buscar Marca'
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