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
import apiBins from '../../../../services/api/locations/apiBins';


BinSearchBox.propTypes = {
  onChange: PropTypes.func,
  error: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  getFieldProps: PropTypes.any,
  bin: PropTypes.object,
  bins: PropTypes.array
};
export default function BinSearchBox(
  {
    onChange,
    error,
    required,
    disabled = false,
    getFieldProps,
    bin = undefined,
    bins = []
  }
) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(bins);
  const loading = open && options.length === 0;
  const [searchQuery, setSearchQuery] = useState('');
  const handleChangeSearch = async (event) => {
    try {
      const { value } = event ? event.target : '';
      setSearchQuery(value);
      if (value) {
        const response = await apiBins.getAll(`page=1&query=${value}`);
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

      disabled={disabled}
      onChange={onChange}
      noOptionsText={<SearchNotFound searchQuery={searchQuery ? setSearchQuery.toString() : ''} />}
      onInputChange={handleChangeSearch}
      getOptionSelected={(option, value) => option.bin_id === value.bin_id}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={Boolean(loading)}
      value={bin}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          {...getFieldProps}
          error={error}
          placeholder='Buscar Bin'
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