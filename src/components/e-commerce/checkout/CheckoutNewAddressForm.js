import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Grid,
  Radio,
  Button,
  Divider,
  Checkbox,
  TextField,
  RadioGroup,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
//
import { DialogAnimate } from '../../animate';
import countries from './countries';

// ----------------------------------------------------------------------

CheckoutNewAddressForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func
};

export default function CheckoutNewAddressForm({
  open,
  onClose,
  onNextStep,
  onCreateBilling
}) {
  const NewAddressSchema = Yup.object().shape({
    receiver: Yup.string().required('Fullname is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    country: Yup.string().required('State is required')
  });

  const formik = useFormik({
    initialValues: {
      addressType: 'Home',
      receiver: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: countries[0].label,
      zipcode: '',
      isDefault: true
    },
    validationSchema: NewAddressSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        onNextStep();
        setSubmitting(true);
        onCreateBilling({
          receiver: values.receiver,
          phone: values.phone,
          fullAddress: `${values.address}, ${values.city}, ${values.state}, ${values.country}, ${values.zipcode}`,
          addressType: values.addressType,
          isDefault: values.isDefault
        });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps
  } = formik;

  return (
    <DialogAnimate maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Add new address</DialogTitle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={3} direction="column">
              <Grid item>
                <RadioGroup row {...getFieldProps('addressType')}>
                  <FormControlLabel
                    value="Home"
                    control={<Radio />}
                    label="Home"
                    sx={{ mr: 2 }}
                  />
                  <FormControlLabel
                    value="Office"
                    control={<Radio />}
                    label="Office"
                  />
                </RadioGroup>
              </Grid>

              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      {...getFieldProps('receiver')}
                      error={Boolean(touched.receiver && errors.receiver)}
                      helperText={touched.receiver && errors.receiver}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      {...getFieldProps('phone')}
                      error={Boolean(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <TextField
                  fullWidth
                  label="Address"
                  {...getFieldProps('address')}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                />
              </Grid>

              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Town / City"
                      {...getFieldProps('city')}
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="State"
                      {...getFieldProps('state')}
                      error={Boolean(touched.state && errors.state)}
                      helperText={touched.state && errors.state}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Zip / Postal Code"
                      {...getFieldProps('zipcode')}
                      error={Boolean(touched.zipcode && errors.zipcode)}
                      helperText={touched.zipcode && errors.zipcode}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <TextField
                  select
                  fullWidth
                  label="Country"
                  placeholder="Country"
                  {...getFieldProps('country')}
                  SelectProps={{ native: true }}
                  error={Boolean(touched.country && errors.country)}
                  helperText={touched.country && errors.country}
                >
                  {countries.map((option) => (
                    <option key={option.code} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </TextField>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.isDefault}
                      {...getFieldProps('isDefault')}
                    />
                  }
                  label="Use this address as default."
                  sx={{ mt: 3 }}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <Divider />

          <DialogActions>
            <LoadingButton
              type="submit"
              variant="contained"
              pending={isSubmitting}
            >
              Deliver to this Address
            </LoadingButton>
            <Button
              type="button"
              color="inherit"
              variant="outlined"
              onClick={onClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </DialogAnimate>
  );
}
