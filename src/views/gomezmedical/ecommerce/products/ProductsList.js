import { Box, Card, Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import EditIcon from '@material-ui/icons/Edit';
import { experimentalStyled as styled } from '@material-ui/core/styles';

import { useState } from 'react';
import { useQuery } from 'react-query';
import LoadingScreen from '../../../../components/LoadingScreen';

import { PATH_APP } from '../../../../routes/paths';
import { MIconButton } from '../../../../components/@material-extend';

import apiProducts from '../../../../services/api/ecommerce/apiProducts';
import ProductSearchBar from './ProductSearchBar';


const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm
}));
export default function ProductsList() {

  const [filterName, setFilterName] = useState('');


  const { data, status, error } =
    useQuery(['products', filterName],
      () => apiProducts.getAll(`query=${filterName}`),
      {
        keepPreviousData: true
      }
    );


  const handleFilterByName = (event) => {


    setFilterName(event.target.value);

  };

  let content;
  if (status === 'loading') {
    content = <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row' colSpan={6}>
        <LoadingScreen />
      </TableCell>
    </TableRow>
    ;
  } else if (status === 'success') {

    content = data.data.map((product) => (
      <TableRow
        hover
        tabIndex={-1}
        key={`product-${product.product_id}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='th' scope='row' padding='none'>
          <Box
            sx={{
              py: 2,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ThumbImgStyle alt={product.name} src='/static/mock-images/products/product_16.jpg' />
            <Typography variant='subtitle2' noWrap>
              {product.name}
            </Typography>
          </Box>
        </TableCell>
        <TableCell component='td' scope='row'>
          {product.subcategory.name}
        </TableCell>
        <TableCell component='td' scope='row'>
          {product.subcategory.category.name}
        </TableCell>
        <TableCell component='td' scope='row'>
         Q {product.current_price?.value}
        </TableCell>
        <TableCell component='td' scope='row' size='small'>
          <Link
            component={RouterLink}
            to={`${PATH_APP.products.products.product}/${product.product_id}`}>
            <MIconButton color='secondary'>
              <EditIcon />
            </MIconButton>
          </Link>

        </TableCell>

      </TableRow>

    ));
  } else if (status === 'error') {
    content = <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row' colSpan={6}>
        {error}
      </TableCell>
    </TableRow>;
  }

  return (
    <Card>

      <ProductSearchBar
        filterName={filterName}
        onFilterName={handleFilterByName}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>
                Producto
              </TableCell>
              <TableCell>
                Categoria
              </TableCell>
              <TableCell>
                SubCategoria
              </TableCell>
              <TableCell>
                Precio
              </TableCell>
              <TableCell>
                Opciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {content}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
    ;
}
