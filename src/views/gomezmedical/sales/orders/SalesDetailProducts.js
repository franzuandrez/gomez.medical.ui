import { useHistory } from 'react-router';
import {
  Box, Button,
  Card,
  Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';

import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';
import { fCurrency } from '../../../../utils/formatNumber';
import apiUnpaidSales from '../../../../services/api/sales/apiUnpaidSales';
import { PATH_APP } from '../../../../routes/paths';


const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

export default function SalesDetailProducts({ order, paid = true }) {


  const history = useHistory();


  const onClickPaid = async () => {

      await apiUnpaidSales.patch({}, order.sales_order_id);
      history.push(`${PATH_APP.sales.orders.root}/${order.sales_order_number}`);


    }
  ;

  return (
    <>
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
                color={order.paid ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {order.paid ? 'Pagado' : 'Pendiente de pago'}
              </Label>
              <Typography variant='h6'>INV-{order.sales_order_number}</Typography>


            </Box>
            {
              !paid &&

              <Box sx={{ textAlign: { sm: 'right' } }}>
                <Button
                  onClick={onClickPaid}
                  size='large'
                  type='button'
                  variant='contained'

                >
                  Pagar
                </Button>
              </Box>

            }
          </Grid>


          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography
              paragraph
              variant='overline'
              sx={{ color: 'text.disabled' }}
            >
              Cliente
            </Typography>
            <Typography variant='body2'>
              {order.customer.business_name} {order.customer.person?.first_name} {order.customer.person?.last_name}
            </Typography>
            <Typography variant='body2'>
              {order.customer.nit}
            </Typography>
            <Typography variant='body2'>
              {order.bill_address?.city} {order.bill_address?.address_line_1}
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
                    <TableCell align='left'>{row.unit_price}</TableCell>
                    <TableCell align='left'>{row.line_total}</TableCell>
                  </TableRow>
                ))}
                <RowResultStyle>
                  <TableCell colSpan={3} />
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
                  <TableCell colSpan={3} />
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
