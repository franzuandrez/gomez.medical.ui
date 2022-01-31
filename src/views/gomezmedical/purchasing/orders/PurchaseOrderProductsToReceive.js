import { add, multiply } from 'lodash';
import PropTypes from 'prop-types';
import {
  Box,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';

import { Icon } from '@iconify/react';
import minusFill from '@iconify/icons-eva/minus-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { MIconButton } from '../../../../components/@material-extend';
// routes
import { fCurrency } from '../../../../utils/formatNumber';
import Scrollbar from '../../../../components/Scrollbar';
import PurchaseOrderEditPrice from './PurchaseOrderEditPrice';


const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

Incrementer.propTypes = {
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
  disabled: PropTypes.bool
};

function Incrementer({ quantity, onIncrease, onDecrease, disabled = false }) {
  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <MIconButton
          size='small'
          color='inherit'
          onClick={onDecrease}
          disabled={quantity <= 0 || disabled}
        >
          <Icon icon={minusFill} width={16} height={16} />
        </MIconButton>
        {quantity}
        <MIconButton
          size='small'
          color='inherit'
          onClick={onIncrease}
          disabled={disabled}
        >
          <Icon icon={plusFill} width={16} height={16} />
        </MIconButton>
      </IncrementerStyle>

    </Box>
  );
}


PurchaseOrderProductsToReceive.propTypes = {
  formik: PropTypes.object,
  handleDecrease: PropTypes.func,
  handleIncrease: PropTypes.func
};

export default function PurchaseOrderProductsToReceive({
                                                         formik,
                                                         handleDecrease,
                                                         handleIncrease,
                                                         handleEditProductPrice,
                                                         editPrices = false
                                                       }) {

  const {
    values,
    getFieldProps,
    setFieldValue
  } = formik;


  return (
    <Scrollbar>
      <TableContainer>
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
              <TableCell align='left'>Cant Solicitada</TableCell>
              <TableCell align='left'>Cant. Entrante</TableCell>
              <TableCell align='left'>Precio</TableCell>
              <TableCell align='left'>Total</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {values.products.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  borderBottom: (theme) =>
                    `solid 1px ${theme.palette.divider}`
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell align='left'>
                  <Box sx={{ maxWidth: 300 }}>
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
                <TableCell align='left'>
                  <Incrementer
                    disabled={editPrices}
                    quantity={add(row.order_quantity, row.received_quantity)}
                    onDecrease={() => handleDecrease(row.product.product_id)}
                    onIncrease={() => handleIncrease(row.product.product_id)}
                  />
                </TableCell>
                <TableCell align='left'>
                  {fCurrency(row.unit_price)}
                  <PurchaseOrderEditPrice
                    detail={row}
                    product={row.product}
                    cost={parseFloat(row.unit_price)}
                    handleEditPrice={handleEditProductPrice}
                  />
                </TableCell>
                <TableCell align='left'>
                  {fCurrency(multiply(add(row.order_quantity, row.received_quantity), (row.unit_price)))}
                </TableCell>

              </TableRow>
            ))}

          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} align='right'>
                {
                  !editPrices &&
                  <FormControlLabel
                    {...getFieldProps('needs_admin_verification')}
                    onChange={() =>
                      setFieldValue('needs_admin_verification', !getFieldProps('needs_admin_verification').value, true)
                    }
                    control={<Switch />} label='Necesita veficacion de precios' />
                }
              </TableCell>
              <TableCell>
                {fCurrency(values.subTotal)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Scrollbar>

  );
}



