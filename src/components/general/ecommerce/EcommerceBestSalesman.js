import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';
// ----------------------------------------------------------------------

import { format } from 'date-fns';
// material
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  Typography,
  TableContainer
} from '@material-ui/core';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';


EcommerceBestSalesman.propTypes = {
  sales: PropTypes.array
};

export default function EcommerceBestSalesman({ sales }) {
  const theme = useTheme();

  return (
    <Card sx={{ pb: 3 }}>
      <CardHeader title='Últimas Ventas' sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Pago</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((row) => (
                <TableRow key={row.sales_order_id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ ml: 2 }}>
                        <Typography variant='subtitle2'> {row.nit}</Typography>
                        <Typography
                          variant='body2'
                          sx={{ color: 'text.secondary' }}
                        >
                          {row.first_name} {row.last_name} {row.business_name}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>  {format(new Date(row.order_date), 'H:mm:ss')}</TableCell>
                  <TableCell>{fCurrency(row.total_due)}</TableCell>
                  <TableCell >
                    <Label
                      variant={
                        theme.palette.mode === 'light' ? 'ghost' : 'filled'
                      }
                      color={
                        (row.payment_type === 'cash' && 'primary') ||
                        'error'
                      }
                    >
                      {sentenceCase(row.payment_type === 'cash' ? 'Efectivo' : 'Credito')}
                    </Label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
