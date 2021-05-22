import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import {
  Box,
  Grid,
  Card,
  Button,
  Typography,
  CardContent
} from '@material-ui/core';
//
import Label from '../../Label';
import CheckoutSummary from './CheckoutSummary';
import CheckoutNewAddressForm from './CheckoutNewAddressForm';

// ----------------------------------------------------------------------

const ADDRESS_BOOKS = [
  {
    receiver: faker.name.findName(),
    fullAddress: faker.address.streetAddress(),
    phone: faker.phone.phoneNumberFormat(),
    addressType: 'Home',
    isDefault: true
  },
  {
    receiver: faker.name.findName(),
    fullAddress: faker.address.streetAddress(),
    phone: faker.phone.phoneNumberFormat(),
    addressType: 'Office',
    isDefault: false
  },
  {
    receiver: faker.name.findName(),
    fullAddress: faker.address.streetAddress(),
    phone: faker.phone.phoneNumberFormat(),
    addressType: 'Office',
    isDefault: false
  },
  {
    receiver: faker.name.findName(),
    fullAddress: faker.address.streetAddress(),
    phone: faker.phone.phoneNumberFormat(),
    addressType: 'Office',
    isDefault: false
  }
];

AddressItem.propTypes = {
  address: PropTypes.object,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func
};

function AddressItem({ address, onNextStep, onCreateBilling }) {
  const { receiver, fullAddress, addressType, phone, isDefault } = address;

  const handleCreateBilling = () => {
    onCreateBilling(address);
    onNextStep();
  };

  return (
    <Card sx={{ position: 'relative', mb: 3 }}>
      <CardContent>
        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1">{receiver}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            &nbsp;({addressType})
          </Typography>
          {isDefault && (
            <Label color="info" sx={{ ml: 1 }}>
              Default
            </Label>
          )}
        </Box>
        <Typography variant="body2" gutterBottom>
          {fullAddress}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {phone}
        </Typography>

        <Box
          sx={{
            mt: 3,
            display: 'flex',
            position: { sm: 'absolute' },
            right: { sm: 24 },
            bottom: { sm: 24 }
          }}
        >
          {!isDefault && (
            <Button variant="outlined" size="small" color="inherit">
              Delete
            </Button>
          )}
          <Box sx={{ mx: 0.5 }} />
          <Button variant="outlined" size="small" onClick={handleCreateBilling}>
            Deliver to this Address
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

CheckoutBillingAddress.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.number,
  subtotal: PropTypes.number,
  onBackStep: PropTypes.func,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func
};

export default function CheckoutBillingAddress({
  total,
  discount,
  subtotal,
  onBackStep,
  onNextStep,
  onCreateBilling,
  ...other
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box {...other}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {ADDRESS_BOOKS.map((address, index) => (
            <AddressItem
              key={index}
              address={address}
              onNextStep={onNextStep}
              onCreateBilling={onCreateBilling}
            />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              size="small"
              color="inherit"
              onClick={onBackStep}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Back
            </Button>
            <Button
              size="small"
              onClick={handleClickOpen}
              startIcon={<Icon icon={plusFill} />}
            >
              Add new address
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary
            subtotal={subtotal}
            total={total}
            discount={discount}
          />
        </Grid>
      </Grid>

      <CheckoutNewAddressForm
        open={open}
        onClose={handleClose}
        onNextStep={onNextStep}
        onCreateBilling={onCreateBilling}
      />
    </Box>
  );
}
