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
  TextField,
  CardHeader,
  Typography,
  CardContent,
  InputAdornment
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

SalesCheckoutSummary.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.number,
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  onEdit: PropTypes.func,
  enableEdit: PropTypes.bool,
  onApplyDiscount: PropTypes.func,
  enableDiscount: PropTypes.bool,
  sx: PropTypes.object
};

export default function SalesCheckoutSummary({
                                               total,
                                               onEdit,
                                               amountGiven = '',
                                               discount,
                                               subtotal,
                                               shipping = null,
                                               onApplyDiscount,
                                               enableEdit = false,
                                               enableDiscount = false,
                                               sx
                                             }) {
  const displayShipping = shipping !== null ? 'Gratis' : '-';

  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardHeader
        title='Resumen de orden'
        action={
          enableEdit && (
            <Button
              size='small'
              type='button'
              onClick={onEdit}
              startIcon={<Icon icon={editFill} />}
            >
              Editar
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
            Descuento
          </Typography>
          <Typography variant='subtitle2'>
            {discount ? fCurrency(-discount) : '-'}
          </Typography>
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
        {amountGiven &&
        <>
          <RowStyle>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>Monto dado</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant='subtitle2'>
                {fCurrency(amountGiven)}
              </Typography>
            </Box>
          </RowStyle>
          <Divider sx={{ mb: 2 }} />
          <RowStyle>
            <Typography variant='subtitle1'>Cambio</Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant='subtitle2'>
                {parseFloat(amountGiven) - parseFloat(total) < 0 ? '---' : fCurrency((parseFloat(amountGiven) - parseFloat(total)))}
              </Typography>
            </Box>
          </RowStyle>
        </>
        }

        {enableDiscount && (
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              placeholder='Discount codes / Gifts'
              value='DISCOUNT5'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Button
                      type='button'
                      onClick={() => onApplyDiscount(5)}
                      sx={{ mr: -0.5 }}
                    >
                      Aplicar
                    </Button>
                  </InputAdornment>
                )
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
