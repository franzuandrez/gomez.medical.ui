import { useState } from 'react';
// material
import Visibility from '@material-ui/icons/Visibility';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {
  Grid,
  Input,
  MenuItem,
  TextField,
  IconButton,
  InputLabel,
  FormControl,
  InputAdornment,
  FormHelperText
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

export default function Standard() {
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
          <TextField variant="standard" fullWidth label="Inactive" />
          <TextField
            fullWidth
            label="Activated"
            variant="standard"
            defaultValue="Hello Minimal"
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="standard"
          />

          <TextField
            disabled
            fullWidth
            label="Disabled"
            variant="standard"
            defaultValue="Hello Minimal"
          />
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="With Icon & Adornments">
          <TextField
            fullWidth
            label="Standard"
            variant="standard"
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
            variant="standard"
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
            variant="standard"
            label="With normal TextField"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Kg</InputAdornment>
              )
            }}
          />
          <FormControl fullWidth>
            <Input
              value={values.weight}
              onChange={handleChange('weight')}
              endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
            />
            <FormHelperText id="standard-weight-helper-text">
              Weight
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
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
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
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
            variant="standard"
            label="Error"
            defaultValue="Hello Minimal"
            helperText="Incorrect entry."
          />
          <TextField
            error
            fullWidth
            variant="standard"
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
            variant="standard"
            type="password"
            label="Password"
            autoComplete="current-password"
          />
          <TextField
            fullWidth
            variant="standard"
            type="number"
            label="Number"
            defaultValue={0}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            variant="standard"
            label="Search"
            type="search"
          />
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Size">
          <TextField
            fullWidth
            variant="standard"
            label="Size"
            size="small"
            defaultValue="Small"
          />
          <TextField
            fullWidth
            variant="standard"
            label="Size"
            defaultValue="Normal"
          />
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Select">
          <TextField
            select
            fullWidth
            variant="standard"
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
            variant="standard"
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
            variant="standard"
            label="Multiline"
            multiline
            maxRows={4}
            value="Controlled"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            variant="standard"
            multiline
            placeholder="Placeholder"
            label="Multiline Placeholder"
          />
          <TextField
            rows={4}
            fullWidth
            variant="standard"
            multiline
            label="Multiline"
            defaultValue="Default Value"
          />
        </Block>
      </Grid>
    </Grid>
  );
}
