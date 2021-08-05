import PropTypes from 'prop-types';

// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  Typography,
  CardContent,
} from '@material-ui/core';

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  '&:not(:last-child)': {
    marginBottom: theme.spacing(2)
  }
}));

PurchaseCheckoutVendorInfo.propTypes = {
  vendor: PropTypes.object,
  sx: PropTypes.object
};

export default function PurchaseCheckoutVendorInfo({
                                                     vendor,
                                                     sx
                                                   }) {



  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardHeader
        title='Pedido'
      />

      <CardContent>

        <RowStyle>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            Proveedor
          </Typography>
          <Typography variant='subtitle1'>
            {vendor?.name}
          </Typography>
        </RowStyle>

      </CardContent>
    </Card>
  );
}
