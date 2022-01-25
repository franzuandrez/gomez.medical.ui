import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
// material
import {
  Card,
  Button,
  Typography,
  CardHeader,
  CardContent
} from '@material-ui/core';

// ----------------------------------------------------------------------

SalesCheckoutBillingInfo.propTypes = {
  billing: PropTypes.object,
  customer: PropTypes.object,
  onBackStep: PropTypes.func,
  sx: PropTypes.object
};

export default function SalesCheckoutBillingInfo({ billing, customer, onBackStep, sx }) {

  const { address, address_type } = billing;

  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardHeader
        title='Dirección'
        action={
          <Button
            size='small'
            type='button'
            startIcon={<Icon icon={editFill} />}
            onClick={onBackStep}
          >
            Editar
          </Button>
        }
      />
      <CardContent>
        <Typography variant='subtitle2' gutterBottom>
          {customer.person.first_name} {customer.person.last_name} {customer.business_name} &nbsp;
          <Typography
            component='span'
            variant='body2'
            sx={{ color: 'text.secondary' }}
          >
            ({address_type.name})
          </Typography>
        </Typography>

        <Typography variant='body2' gutterBottom>
          {address.city} {address.address_line_1}
        </Typography>

      </CardContent>
    </Card>
  );
}
