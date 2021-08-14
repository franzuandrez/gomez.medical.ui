import {
  Box,

  Dialog,

  DialogTitle,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Divider
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import add2Fill from '@iconify/icons-eva/file-add-fill';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Scrollbar from '../../../../components/Scrollbar';
import getColorName from '../../../../utils/getColorName';
import { fCurrency } from '../../../../utils/formatNumber';
import { MIconButton } from '../../../../components/@material-extend';


// ----------------------------------------------------------------------
const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm
}));

export default function SalesProductsSearched({ products, isOpen, onAddProduct, handleClose }) {


  return (
    <Box sx={{ textAlign: 'center' }}>
      <Dialog open={isOpen} onClose={() => handleClose()}
              maxWidth='md'
              fullWidth
      >
        <DialogTitle>Productos</DialogTitle>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell>Lote</TableCell>
                  <TableCell align='left'>Precio</TableCell>
                  <TableCell align='right' />
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => {
                  const {
                    id,
                    name,
                    size,
                    color,
                    batch
                  } = product;
                  return (
                    <TableRow key={id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ThumbImgStyle alt='product image' src={product.images[0].path} />
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
                      <TableCell align='left'>{fCurrency(product.price.value)}</TableCell>
                      <TableCell align='right'>
                        <MIconButton onClick={() => onAddProduct(product)}>
                          <Icon icon={add2Fill} width={20} height={20} />
                        </MIconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Dialog>
    </Box>
  );
}
