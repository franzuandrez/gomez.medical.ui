import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer, TextField
} from '@material-ui/core';
import getColorName from '../../../../utils/getColorName';
import { MIconButton } from '../../../../components/@material-extend';
import { fCurrency } from '../../../../utils/formatNumber';

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func
};

function Incrementer({ available, quantity, onIncrease, onDecrease }) {
  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <MIconButton
          size='small'
          color='inherit'
          onClick={onDecrease}
          disabled={quantity <= 1}
        >
          <Icon icon={minusFill} width={16} height={16} />
        </MIconButton>

        <TextField
          fullWidth
          variant='standard'
          value={quantity}
          disabled={quantity >= available}
          onChange={(e) => onIncrease(e.target.value > available ? quantity : e.target.value)}
        />

        <MIconButton
          size='small'
          color='inherit'
          onClick={() => onIncrease(1)}
          disabled={quantity >= available}
        >
          <Icon icon={plusFill} width={16} height={16} />
        </MIconButton>
      </IncrementerStyle>
      <Typography variant='caption' sx={{ color: 'text.secondary' }}>
        Disponible: {available}
      </Typography>
    </Box>
  );
}

SalesCheckoutProductList.propTypes = {
  formik: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func
};

export default function SalesCheckoutProductList({
                                                   formik,
                                                   onDelete,
                                                   onIncreaseQuantity,
                                                   onDecreaseQuantity
                                                 }) {
  const { products } = formik.values;

  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell>Lote</TableCell>
            <TableCell align='left'>Precio</TableCell>
            <TableCell align='left'>Cantidad</TableCell>
            <TableCell align='right'>Total</TableCell>
            <TableCell align='right' />
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => {
            const {
              id,
              name,
              size,
              price,
              color,
              cover,
              quantity,
              available,
              batch
            } = product;
            return (
              <TableRow key={id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ThumbImgStyle alt='product image' src={cover} />
                    <Box>
                      <Typography
                        noWrap
                        variant='subtitle2'
                        sx={{ maxWidth: 240 }}
                      >
                        {name}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Typography variant='body2'>
                          <Typography
                            component='span'
                            variant='body2'
                            sx={{ color: 'text.secondary' }}
                          >
                            size:&nbsp;
                          </Typography>
                          {size}
                        </Typography>
                        <Divider
                          orientation='vertical'
                          sx={{ mx: 1, height: 16 }}
                        />
                        <Typography variant='body2'>
                          <Typography
                            component='span'
                            variant='body2'
                            sx={{ color: 'text.secondary' }}
                          >
                            color:&nbsp;
                          </Typography>
                          {getColorName(color)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell>{batch}</TableCell>
                <TableCell align='left'>{fCurrency(price)}</TableCell>
                <TableCell align='left'>
                  <Incrementer
                    quantity={parseInt(quantity, 10)}
                    available={available}
                    onDecrease={(qty) => onDecreaseQuantity(id, qty)}
                    onIncrease={(qty) => onIncreaseQuantity(id, qty)}
                  />
                </TableCell>

                <TableCell align='right'>
                  {fCurrency(price * quantity)}
                </TableCell>

                <TableCell align='right'>
                  <MIconButton onClick={() => onDelete(id)}>
                    <Icon icon={trash2Fill} width={20} height={20} />
                  </MIconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
