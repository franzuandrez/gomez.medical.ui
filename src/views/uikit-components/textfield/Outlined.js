import { useState } from 'react';
// material
import Visibility from '@material-ui/icons/Visibility';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {
  Grid,
  MenuItem,
  TextField,
  IconButton,
  FormControl,
  OutlinedInput,
  FormHelperText,
  InputAdornment
} from '@material-ui/core';
// components
import Block from '../../../components/Block';

// ----------------------------------------------------------------------

const CURRENCIES = [
  { value: 'USD', label: '$' },
  { value: 'EUR', label: '€' },
  { value: 'BTC', label: '฿' },
  { value: 'JPY', label: '¥' }
];

// ----------------------------------------------------------------------

export default function Outlined() {
  const [currency, setCurrency] = useState('EUR');
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
  });

  const handleChangeCurrency = (event) => {
    setCurrency(event.target.value);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Block title="General">
          <TextField fullWidth label="Inactive" />
          <TextField fullWidth label="Activated" defaultValue="Hello Minimal" />
          <TextField fullWidth type="password" label="Password" />

          <TextField
            disabled
            fullWidth
            label="Disabled"
            defaultValue="Hello Minimal"
          />
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="With Icon & Adornments">
          <TextField
            fullWidth
            label="Outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />
          <TextField
            disabled
            fullWidth
            label="Disabled"
            defaultValue="Hello Minimal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />
          <TextField
            fullWidth
            label="With normal TextField"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Kg</InputAdornment>
              )
            }}
          />
          <FormControl fullWidth>
            <OutlinedInput
              value={values.weight}
              onChange={handleChange('weight')}
              endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
            />
            <FormHelperText id="standard-weight-helper-text">
              Weight
            </FormHelperText>
          </FormControl>

          <FormControl fullWidth>
            <OutlinedInput
              placeholder="Password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="With Caption">
          <TextField
            fullWidth
            label="Error"
            defaultValue="Hello Minimal"
            helperText="Incorrect entry."
          />
          <TextField
            error
            fullWidth
            label="Error"
            defaultValue="Hello Minimal"
            helperText="Incorrect entry."
          />
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Type">
          <TextField
            fullWidth
            type="password"
            label="Password"
            autoComplete="current-password"
          />
          <TextField
            fullWidth
            type="number"
            label="Number"
            defaultValue={0}
            InputLabelProps={{ shrink: true }}
          />
          <TextField fullWidth label="Search" type="search" />
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Size">
          <TextField fullWidth label="Size" size="small" defaultValue="Small" />
          <TextField fullWidth label="Size" defaultValue="Normal" />
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Select">
          <TextField
            select
            fullWidth
            label="Select"
            value={currency}
            onChange={handleChangeCurrency}
            helperText="Please select your currency"
          >
            {CURRENCIES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            size="small"
            value={currency}
            label="Native select"
            SelectProps={{ native: true }}
            onChange={handleChangeCurrency}
            helperText="Please select your currency"
          >
            {CURRENCIES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Multiline">
          <TextField
            fullWidth
            label="Multiline"
            multiline
            maxRows={4}
            value="Controlled"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            multiline
            placeholder="Placeholder"
            label="Multiline Placeholder"
          />
          <TextField
            rows={4}
            fullWidth
            multiline
            label="Multiline"
            defaultValue="Default Value"
          />
        </Block>
      </Grid>
    </Grid>
  );
}
