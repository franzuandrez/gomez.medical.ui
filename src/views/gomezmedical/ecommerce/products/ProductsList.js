import { Box, Card, Divider, LinearProgress, Link, TableFooter, TablePagination, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';

import { experimentalStyled as styled } from '@material-ui/core/styles';

import { useState } from 'react';
import { useQuery } from 'react-query';
import LoadingScreen from '../../../../components/LoadingScreen';

import { PATH_APP } from '../../../../routes/paths';
import { MIconButton } from '../../../../components/@material-extend';
import { TablePaginationActions } from '../../components/TablePaginationActions';
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
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);


  const { data, status, error, isFetching } =
    useQuery(['products', query, page],
      () => apiProducts.getAll(`query=${query}&page=${page + 1}`),
      {
        keepPreviousData: true
      }
    );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleFilterByName = (event) => {

    setFilterName(event.target.value);


  };
  const handleEnter = (event) => {


    if (event.which === 13) {

      setQuery(filterName);
      event.target.select();
    }


  };


  let content;
  if (status === 'loading') {
    content = <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row' colSpan={7}>
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThumbImgStyle alt={product.name}
                           src={
                             product.images.length > 0
                               ?
                               product.images[0].path
                               :
                               '/static/mock-images/no-image.png'
                           }
            />
            <Box>
              <Typography
                noWrap
                variant='subtitle2'
                sx={{ maxWidth: 240 }}
              >
                {product.name}
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
                    T/P:&nbsp;
                  </Typography>
                  {product.size}
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
                    Color:&nbsp;
                  </Typography>
                  {product.color}
                </Typography>

              </Box>

            </Box>
          </Box>
        </TableCell>
        <TableCell component='td' scope='row'>
          {product.sku}
        </TableCell>
        <TableCell component='td' scope='row'>
          <Box>
            <Typography
              noWrap
              variant='subtitle2'
              sx={{ maxWidth: 240 }}
            >
              <Typography
                component='span'
                variant='body2'
                sx={{ color: 'text.secondary' }}
              >
                Cat:&nbsp;
              </Typography>
              {product.subcategory?.category?.name}
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
                  Sub:&nbsp;
                </Typography>
                {product.subcategory?.name}
              </Typography>

            </Box>

          </Box>

        </TableCell>
        <TableCell component='td' scope='row'>
          Q {product.current_price?.value}
        </TableCell>
        <TableCell component='td' scope='row' size='small'>
          <Link
            component={RouterLink}
            to={`${PATH_APP.products.products.root}/${product.product_id}`}>
            <MIconButton color='secondary'>
              <EditIcon />
            </MIconButton>
          </Link>
          <Link
            component={RouterLink}
            to={`${PATH_APP.products.products.root}/show/${product.product_id}`}>
            <MIconButton color='default'>
              <VisibilityIcon />
            </MIconButton>
          </Link>

        </TableCell>

      </TableRow>

    ));
  } else if (status === 'error') {
    content = <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row' colSpan={7}>
        {error}
      </TableCell>
    </TableRow>;
  }

  return (
    <Card>
      <ProductSearchBar
        filterName={filterName}
        onFilterName={handleFilterByName}
        onEnter={handleEnter}
      />
      {isFetching && <LinearProgress />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>
                Producto
              </TableCell>
              <TableCell>
                SKU
              </TableCell>
              <TableCell>
                Categoria
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
          <TableFooter>
            <TableRow>
              {status === 'success' && <TablePagination
                colSpan={5}
                rowsPerPageOptions={[15, { label: 'Todos', value: -1 }]}
                SelectProps={{
                  inputProps: { 'aria-label': 'Filas por página' },
                  native: true
                }}
                count={data.meta.total}
                rowsPerPage={data.meta.per_page}
                page={page}
                onPageChange={handleChangePage}
                ActionsComponent={TablePaginationActions}
              />}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Card>
  )
    ;
}
