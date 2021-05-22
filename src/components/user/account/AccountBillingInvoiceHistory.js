import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { Box, Link, Button, Typography } from '@material-ui/core';
// utils
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

AccountBillingInvoiceHistory.propTypes = {
  invoices: PropTypes.array
};

export default function AccountBillingInvoiceHistory({ invoices }) {
  return (
    <>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Invoice History
      </Typography>

      {invoices.map((invoice) => (
        <Box
          key={invoice.id}
          sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography variant="body2" sx={{ minWidth: 160 }}>
            {fDate(invoice.createdAt)}
          </Typography>
          <Typography variant="body2">{fCurrency(invoice.price)}</Typography>
          <Link component={RouterLink} to="#">
            PDF
          </Link>
        </Box>
      ))}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button size="small" endIcon={<Icon icon={arrowIosForwardFill} />}>
          All invoices
        </Button>
      </Box>
    </>
  );
}
