import PropTypes from 'prop-types';
// material
import { TextField, Autocomplete } from '@material-ui/core';

// ----------------------------------------------------------------------

MultipleValues.propTypes = {
  options: PropTypes.array
};

export default function MultipleValues({ options }) {
  return (
    <Autocomplete
      multiple
      fullWidth
      options={options}
      getOptionLabel={(option) => option.title}
      defaultValue={[options[13]]}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label="filterSelectedOptions"
          placeholder="Favorites"
        />
      )}
    />
  );
}
