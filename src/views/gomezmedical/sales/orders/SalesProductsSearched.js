import { useState } from 'react';
import { useSnackbar } from 'notistack';
import useKeyboardShortcut from 'use-keyboard-shortcut';
import PropTypes from 'prop-types';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography, Divider, DialogActions, Button
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import add2Fill from '@iconify/icons-eva/file-add-fill';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Scrollbar from '../../../../components/Scrollbar';
import getColorName from '../../../../utils/getColorName';
import { fCurrency } from '../../../../utils/formatNumber';
import { MIconButton } from '../../../../components/@material-extend';
import SalesSearchBar from "./SalesSearchBar";



const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm
}));
SalesProductsSearched.propTypes = {
  products: PropTypes.array,
  isOpen: PropTypes.bool,
  onAddProduct: PropTypes.func,
  handleClose: PropTypes.func
};


export default function SalesProductsSearched({ products, isOpen, onAddProduct, handleClose }) {

  const [currentProductSelected, setCurrentProductSelected] = useState(null);
  const [currentIndexProductSelected, setCurrentIndexProductSelected] = useState(-1);
  const { enqueueSnackbar } = useSnackbar();

  const [filterName, setFilterName] = useState('');

  const handleMoveAcrossProducts = (moveTo = 1) => {

    const max = (products?.length ?? Infinity) - 1;
    if (currentIndexProductSelected - moveTo >= 0 && currentIndexProductSelected - moveTo <= max) {
      setCurrentIndexProductSelected(currentIndexProductSelected - moveTo);
      setCurrentProductSelected(products[currentIndexProductSelected-moveTo]);

    }
  };

  const handleAddProduct = (product) => {
    if (product) {
      onAddProduct(product);
      enqueueSnackbar('Agregado', { variant: 'success', autoHideDuration: 1000 });
      setCurrentProductSelected(null);
      setCurrentIndexProductSelected(-1);
      handleClose()
      setFilterName('')
    }
  };
  const onEnter = (e) => {

    if (e.which === 13) {

      e.target.select();
    }
  };
  const handleChangeSearchQuery = (event) => {
    setFilterName(event.target.value);
  }
  const  onClose = async ( ) => {
    handleClose();
    await new Promise(r => setTimeout(r, 2000))
    setFilterName('')

  }

  const handleCompareQueryString = (attr ,query ) => attr.toUpperCase().trim().search(query.toUpperCase().trim()) + 1 || query === ''

  useKeyboardShortcut(['ArrowUp'], () => handleMoveAcrossProducts(1), { overrideSystem: false });
  useKeyboardShortcut(['ArrowDown'], () => handleMoveAcrossProducts(-1), { overrideSystem: false });
  useKeyboardShortcut(['enter'], () => handleAddProduct(currentProductSelected), { overrideSystem: false });
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Dialog open={isOpen} onClose={() =>onClose() }
              maxWidth='md'
              fullWidth
      >
        <DialogTitle>Productos</DialogTitle>

        <DialogContent>
          <SalesSearchBar
              filterName={filterName}
              onEnter={onEnter}
              onFilterName={handleChangeSearchQuery}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell>Lote</TableCell>
                    <TableCell>Ubicación</TableCell>
                    <TableCell align='left'>Precio</TableCell>
                    <TableCell align='right' />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.filter(product=>
                      handleCompareQueryString(product.bin,filterName) ||
                      handleCompareQueryString(product.name,filterName) ||
                      handleCompareQueryString(product.size,filterName) ||
                      handleCompareQueryString(product.color,filterName) ||
                      handleCompareQueryString(product.batch,filterName)
                  ).map((product, index) => {                    const {
                      id,
                      name,
                      size,
                      color,
                      batch,
                      bin
                    } = product;
                    return (
                      <TableRow key={id} selected={index === currentIndexProductSelected}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ThumbImgStyle alt='product image' src={product.images[0]?.path} />
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
                        <TableCell>{bin}</TableCell>
                        <TableCell align='left'>{fCurrency(product.price.value)}</TableCell>
                        <TableCell align='right'>
                          <MIconButton onClick={() => handleAddProduct(product)}>
                            <Icon icon={add2Fill} width={20} height={20} />
                          </MIconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>onClose()}>Cancelar</Button>

        </DialogActions>
      </Dialog>
    </Box>
  );
}
