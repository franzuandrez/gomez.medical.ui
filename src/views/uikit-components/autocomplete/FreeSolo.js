import PropTypes from 'prop-types';
// material
import { TextField, Autocomplete } from '@material-ui/core';

// ----------------------------------------------------------------------

FreeSolo.propTypes = {
  options: PropTypes.array
};

export default function FreeSolo({ options }) {
  return (
    <>
      <Autocomplete
        fullWidth
        freeSolo
        options={options.map((option) => option.title)}
        renderInput={(params) => <TextField {...params} label="freeSolo" />}
      />
      <Autocomplete
        fullWidth
        freeSolo
        disableClearable
        options={options.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </>
  );
}
