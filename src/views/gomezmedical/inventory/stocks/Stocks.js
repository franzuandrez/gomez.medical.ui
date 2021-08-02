import { useState } from 'react';
import { useQuery } from 'react-query';
// material


import {
  experimentalStyled as styled
} from '@material-ui/core/styles';
import {
  Box,
  Card,
  Container,
  Divider, LinearProgress,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
// components
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import Scrollbar from '../../../../components/Scrollbar';
import apiStocks from '../../../../services/api/inventory/apiStocks';
import LoadingScreen from '../../../../components/LoadingScreen';
import { fCurrency } from '../../../../utils/formatNumber';
import { TablePaginationActions } from '../../components/TablePaginationActions';
import SearchBar from '../../components/SearchBar';


// ----------------------------------------------------------------------


const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm
}));


export default function Stocks() {


  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');

  const { data, status, error, isFetching } =
    useQuery(['stocks', page,filterName], () => apiStocks.getAll(`page=${page + 1}&query=${filterName}`), {
      keepPreviousData: true
    });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);

  };


  const renderContent = () => {

    if (status === 'loading') {
      return <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='td' scope='row' colSpan={5}>
          <LoadingScreen />
        </TableCell>
      </TableRow>
        ;
    }
    if (status === 'success') {
      return data.data.map((stock) => (
        <TableRow
          key={`stock-${stock.batch}-${stock.bin}-${stock.product_id}`}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component='td' scope='row'>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ThumbImgStyle alt='product image' src={stock?.images.length > 0 ? stock?.images[0].path : ''} />
              <Box>
                <Typography
                  noWrap
                  variant='subtitle2'
                  sx={{ maxWidth: 240 }}
                >
                  {stock.name}
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
                    {stock.size}
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
                    {stock.color}
                  </Typography>

                </Box>
              </Box>
            </Box>
          </TableCell>
          <TableCell>
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
                  Lote:&nbsp;
                </Typography>
                {stock.batch}
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
                  F.Vencimiento:&nbsp;
                </Typography>
                {stock.best_before}
              </Typography>

            </Box>
          </TableCell>
          <TableCell>
            {stock.bin}
          </TableCell>
          <TableCell>
            {stock.stock}
          </TableCell>
          <TableCell>
            {fCurrency(stock.price?.value)}
          </TableCell>

        </TableRow>
      ));
    }
    return <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row' colSpan={5}>
        {error}
      </TableCell>
    </TableRow>;

  };

  return (
    <Page title='Inventario: Stocks | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Stock'
          links={[
            { name: 'Stock' }
          ]}
        />

        <Card>
          <SearchBar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          {isFetching && <LinearProgress />}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Producto
                    </TableCell>
                    <TableCell>
                      Lote
                    </TableCell>
                    <TableCell>
                      Ubicacion
                    </TableCell>
                    <TableCell>
                      Stock
                    </TableCell>
                    <TableCell>
                      Precio
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    renderContent()
                  }
                </TableBody>
                <TableFooter>
                  <TableRow>
                    {status === 'success' && <TablePagination
                      colSpan={5}
                      rowsPerPageOptions={[15]}
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
          </Scrollbar>
        </Card>


      </Container>
    </Page>
  );
}
