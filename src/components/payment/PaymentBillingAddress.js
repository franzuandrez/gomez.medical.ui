import PropTypes from 'prop-types';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    padding: 0,
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

PaymentBillingAddress.propTypes = {
  formik: PropTypes.object.isRequired
};

export default function PaymentBillingAddress({ formik }) {
  const { touched, errors, getFieldProps } = formik;

  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        Billing Address
      </Typography>
      <TextField
        fullWidth
        label="Person name"
        {...getFieldProps('name')}
        error={Boolean(touched.name && errors.name)}
        helperText={touched.name && errors.name}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="phone"
        label="Phone number"
        {...getFieldProps('phone')}
        error={Boolean(touched.phone && errors.phone)}
        helperText={touched.phone && errors.phone}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="email"
        label="Email"
        {...getFieldProps('email')}
        error={Boolean(touched.email && errors.email)}
        helperText={touched.email && errors.email}
        sx={{ mb: 3 }}
      />

      <TextField
        fullWidth
        name="address"
        label="Address"
        {...getFieldProps('address')}
        error={Boolean(touched.address && errors.address)}
        helperText={touched.address && errors.address}
      />
    </RootStyle>
  );
}
