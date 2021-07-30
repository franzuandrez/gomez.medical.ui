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
import apiShipMethods from '../../../../services/api/purchasing/apiShipMethods';


ShipMethodSearchBox.propTypes = {
  onChange: PropTypes.func,
  error: PropTypes.bool,
  required: PropTypes.bool,
  getFieldProps: PropTypes.any,
  items: PropTypes.array
};

export default function ShipMethodSearchBox(
  {
    onChange,
    error,
    required,
    getFieldProps,
    items = []
  }
) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(items);
  const loading = open && options.length === 0;
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeSearch = async (event) => {
    try {
      const { value } = event ? event.target : '';
      setSearchQuery(value);
      if (value) {
        const response = await apiShipMethods.getAll(`page=1&query=${value}`);
        const items = response.data;
        setOptions(Object.keys(items).map((key) => items[key]));
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Autocomplete
      id='asynchronous-mehtod-search-box'
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
      getOptionSelected={(option, value) => option.ship_method_id === value.ship_method_id}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={Boolean(loading)}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          {...getFieldProps}
          error={error}
          placeholder='Buscar Método envio...'
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