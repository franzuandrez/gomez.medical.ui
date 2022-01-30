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
import apiUnitMeasures from '../../../services/api/unit_measure/apiUnitMeasures';


UnitsMeasuresSearchBox.propTypes = {
  onChange: PropTypes.func,
  error: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  getFieldProps: PropTypes.any,
  unit: PropTypes.object,
  units: PropTypes.array,
  placeholder: PropTypes.string
};

export default function UnitsMeasuresSearchBox(
  {
    onChange,
    error,
    required,
    disabled = false,
    getFieldProps,
    unit = undefined,
    units = [],
    placeholder = 'Buscar Medida',

  }
) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(units);

  const [searchQuery, setSearchQuery] = useState('');

  const { isLoading } = useQuery(
    ['units_measure', searchQuery],
    async () => {
      const result = await apiUnitMeasures.getAll(`page=1&query=${searchQuery}`);
      const units = result.data;
      setOptions(Object.keys(units).map((key) => units[key]));
    },
    {
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
      getOptionSelected={(option, value) => option.unit_measure_code === value.unit_measure_code}
      getOptionLabel={(option) => option.name}
      options={options}
      value={unit}
      loading={Boolean(isLoading)}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          {...getFieldProps}
          error={error}
          placeholder={placeholder}
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