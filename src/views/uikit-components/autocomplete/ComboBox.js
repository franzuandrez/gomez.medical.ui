import PropTypes from 'prop-types';
// material
import { TextField, Autocomplete } from '@material-ui/core';

// ----------------------------------------------------------------------

ComboBox.propTypes = {
  options: PropTypes.array
};

export default function ComboBox({ options }) {
  return (
    <Autocomplete
      fullWidth
      options={options}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField {...params} label="Combo box" margin="none" />
      )}
    />
  );
}
