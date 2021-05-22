import PropTypes from 'prop-types';
import { useState } from 'react';
// material
import { TextField, Autocomplete, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

ControllableStates.propTypes = {
  options: PropTypes.array
};

export default function ControllableStates({ options }) {
  const [value, setValue] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <Autocomplete
        fullWidth
        value={value}
        options={options}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Controllable" />}
      />
      <Typography variant="body2" sx={{ mt: 2 }}>{`value: ${
        value !== null ? `'${value}'` : 'null'
      }`}</Typography>
      <Typography variant="body2">{`inputValue: '${inputValue}'`}</Typography>
    </>
  );
}
