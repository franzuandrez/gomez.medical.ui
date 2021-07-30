import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Button,
  Divider,
  CardHeader,
  Typography,
  CardContent
} from '@material-ui/core';
// utils
import { fCurrency } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  '&:not(:last-child)': {
    marginBottom: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

PurchaseReceiveOrderSummary.propTypes = {
  total: PropTypes.number,
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  onEdit: PropTypes.func,
  enableEdit: PropTypes.bool,
  sx: PropTypes.object
};

export default function PurchaseReceiveOrderSummary({
                                                      total,
                                                      onEdit,
                                                      subtotal,
                                                      shipping = null,
                                                      enableEdit = false,
                                                      sx
                                                    }) {
  const displayShipping = shipping !== null ? 'Gratis' : '-';


  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardHeader
        title='Resumen de Orden'
        action={
          enableEdit && (
            <Button
              size='small'
              type='button'
              onClick={onEdit}
              startIcon={<Icon icon={editFill} />}
            >
              Edit
            </Button>
          )
        }
      />

      <CardContent>
        <RowStyle>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            Sub Total
          </Typography>
          <Typography variant='subtitle2'>{fCurrency(subtotal)}</Typography>
        </RowStyle>


        <RowStyle>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            Envio
          </Typography>
          <Typography variant='subtitle2'>
            {shipping ? fCurrency(shipping) : displayShipping}
          </Typography>
        </RowStyle>

        <Divider sx={{ mb: 2 }} />

        <RowStyle>
          <Typography variant='subtitle1'>Total</Typography>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant='subtitle1' sx={{ color: 'error.main' }}>
              {fCurrency(total)}
            </Typography>

          </Box>
        </RowStyle>

      </CardContent>
    </Card>
  );
}
