import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link, TableFooter, TablePagination } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ShopIcon from '@material-ui/icons/ShoppingCart';
import Label from '../../../../components/Label';
import LoadingScreen from '../../../../components/LoadingScreen';
import { PATH_APP } from '../../../../routes/paths';
import { MIconButton } from '../../../../components/@material-extend';
import apiPurchase from '../../../../services/api/purchasing/apiPurchase';
import { TablePaginationActions } from '../../components/TablePaginationActions';


export default function PurchaseOrdersList() {

  const theme = useTheme();
  const [page, setPage] = useState(0);
  const { data, status, error } = useQuery(['purchases', page],
    () => apiPurchase.getAll(`page=${page}`), {
      keepPreviousData: true
    });


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  let content;
  if (status === 'loading') {
    content = <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row' colSpan={4}>
        <LoadingScreen />
      </TableCell>
    </TableRow>
    ;
  } else if (status === 'success') {

    content = data.data.map((purchase) => (
      <TableRow
        key={`purchase-${purchase.purchase_order_id}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='td' scope='row'>
          {purchase.vendor}
        </TableCell>
        <TableCell component='td' scope='row'>
          {purchase.order_date}
        </TableCell>
        <TableCell component='td' scope='row'>

          <Label
            variant={
              theme.palette.mode === 'light'
                ? 'ghost'
                : 'filled'
            }
            color={
              (purchase.status === 'pendiente' && 'error') ||
              (purchase.status === 'recepcionada' && 'info') || 'success'

            }
          >
            {purchase.status}
          </Label>
        </TableCell>

        <TableCell component='td' scope='row' size='small'>
          <Link
            component={RouterLink}
            to={`${PATH_APP.purchasing.orders.root}/${purchase.purchase_order_id}`}>
            <MIconButton color='secondary'>
              <VisibilityIcon />
            </MIconButton>
          </Link>

          {purchase.status === 'recepcionada' &&
          <Link
            component={RouterLink}
            to={`${PATH_APP.purchasing.orders.root}/locate/${purchase.purchase_order_id}`}>
            <MIconButton color='primary'>
              <ShopIcon />
            </MIconButton>
          </Link>

          }
          {purchase.status === 'pendiente' &&
          <Link
            component={RouterLink}
            to={`${PATH_APP.purchasing.orders.root}/receive/${purchase.purchase_order_id}`}>
            <MIconButton color='primary'>
              <ShopIcon />
            </MIconButton>
          </Link>

          }

        </TableCell>

      </TableRow>

    ));
  } else if (status === 'error') {
    content = <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row' colSpan={4}>
        {error}
      </TableCell>
    </TableRow>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>
              Proveedor
            </TableCell>
            <TableCell>
              Fecha
            </TableCell>
            <TableCell>
              Estado
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
              colSpan={4}
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

  )
    ;
}
