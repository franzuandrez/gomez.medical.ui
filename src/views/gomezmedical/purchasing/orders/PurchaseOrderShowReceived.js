import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Card,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer
} from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';
import { fCurrency } from '../../../../utils/formatNumber';
import PurchaseOrderShowToolbar from './PurchaseOrderShowToolbar';

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

PurchaseOrderShowReceived.propTypes = {
  order: PropTypes.object
};


export default function PurchaseOrderShowReceived({ order }) {

  const { status, needs_admin_verification ,is_paid} = order;
  return (
    <>
      <PurchaseOrderShowToolbar purchase={order} />
      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box
              component='img'
              alt='logo'
              src='/static/brand/logo_full.svg'
              sx={{ height: 48 }}
            />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                color='success'
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {status}
              </Label>
              {needs_admin_verification === 1 &&
              <Label
                color='error'
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                Revisión precios
              </Label>
              }
              {is_paid === 0 &&
              <Label
                color='error'
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                Pendiente de pago
              </Label>
              }

              <Typography variant='h6'>PED-{order.purchase_order_id}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography
              paragraph
              variant='overline'
              sx={{ color: 'text.disabled' }}
            >
              Proveedor
            </Typography>
            <Typography variant='body2'>
              {order.vendor.name}
            </Typography>
            <Typography variant='body2'>
              {order.vendor.url_web}
            </Typography>
          </Grid>

        </Grid>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 960 }}>
            <Table>
              <TableHead
                sx={{
                  borderBottom: (theme) =>
                    `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' }
                }}
              >
                <TableRow>
                  <TableCell width={40}>#</TableCell>
                  <TableCell align='left'>Descripción</TableCell>
                  <TableCell align='left'>Cant. Solicitada</TableCell>
                  <TableCell align='left'>Cant. Recibida</TableCell>
                  <TableCell align='left'>Precio</TableCell>
                  <TableCell align='left'>Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {order.detail.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: (theme) =>
                        `solid 1px ${theme.palette.divider}`
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align='left'>
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant='subtitle2'>
                          {row.product.name}
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{ color: 'text.secondary' }}
                          noWrap
                        >
                          {row.product.description_formatted}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align='left'>{row.order_quantity}</TableCell>
                    <TableCell align='left'>{row.received_quantity}</TableCell>
                    <TableCell align='left'>{fCurrency(row.unit_price)}</TableCell>
                    <TableCell align='left'>{fCurrency(row.line_total)}</TableCell>
                  </TableRow>
                ))}
                <RowResultStyle>
                  <TableCell colSpan={4} />
                  <TableCell align='right'>
                    <Box sx={{ mt: 2 }} />
                    <Typography variant='body1'>Subtotal</Typography>
                  </TableCell>
                  <TableCell align='right' width={120}>
                    <Box sx={{ mt: 2 }} />
                    <Typography variant='body1'>
                      {fCurrency(order.subtotal)}
                    </Typography>
                  </TableCell>
                </RowResultStyle>
                <RowResultStyle>
                  <TableCell colSpan={4} />
                  <TableCell align='right'>
                    <Box sx={{ mt: 2 }} />
                    <Typography variant='body1'>
                      Envio
                    </Typography>
                    <Typography variant='body2'>
                      {order.ship_method.name}
                    </Typography>
                  </TableCell>
                  <TableCell align='right' width={120}>
                    <Box sx={{ mt: 2 }} />
                    <Typography variant='body1'>
                      {order.freight === 0 ? 'Gratis' : fCurrency(order.freight)}
                    </Typography>
                  </TableCell>
                </RowResultStyle>
                <RowResultStyle>
                  <TableCell colSpan={4} />
                  <TableCell align='right'>
                    <Typography variant='h6'>Total</Typography>
                  </TableCell>
                  <TableCell align='right' width={140}>
                    <Typography variant='h6'>{fCurrency(order.total_due)}</Typography>
                  </TableCell>
                </RowResultStyle>
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

      </Card>

    </>
  );
}
