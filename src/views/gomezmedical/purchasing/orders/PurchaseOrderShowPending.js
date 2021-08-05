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
  TableContainer,
} from '@material-ui/core';
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';
import PurchaseOrderShowToolbar from './PurchaseOrderShowToolbar';

PurchaseOrderShowPending.propTypes = {
  order: PropTypes.object
};


export default function PurchaseOrderShowPending({ order }) {


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
                {order.status}
              </Label>
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
                  <TableCell align='left'>Cantidad</TableCell>
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

                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

      </Card>
    </>


  );
}
