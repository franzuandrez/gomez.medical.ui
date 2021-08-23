import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import { fetchWarehouses } from '../../../../redux/slices/warehouseSlice';
import LoadingScreen from '../../../../components/LoadingScreen';
import { PATH_APP } from '../../../../routes/paths';
import { MIconButton } from '../../../../components/@material-extend';


export default function WarehousesList() {

  const dispatch = useDispatch();
  const { warehouses } = useSelector((state) => state.warehouse);
  const warehouseStatus = useSelector(state => state.warehouse.status);
  const error = useSelector(state => state.warehouse.error);
  useEffect(() => {

    if (warehouseStatus === 'idle') {
      dispatch(fetchWarehouses());
    }
  }, [warehouseStatus, dispatch]);

  let content;
  if (warehouseStatus === 'loading') {
    content = <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row' colSpan={2}>
        <LoadingScreen />
      </TableCell>
    </TableRow>
    ;
  } else if (warehouseStatus === 'succeeded') {

    content = warehouses.map((warehouse) => (
      <TableRow
        key={`warehouse-${warehouse.warehouse_id}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='td' scope='row'>
          {warehouse.name}
        </TableCell>
        <TableCell component='td' scope='row' size='small'>
          <Link
            component={RouterLink}
            to={`${PATH_APP.locations.warehouses.root}/${warehouse.warehouse_id}`}>
            <MIconButton color='secondary'>
              <EditIcon />
            </MIconButton>
          </Link>

        </TableCell>

      </TableRow>

    ));
  } else if (warehouseStatus === 'failed') {
    content = <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row' colSpan={2}>
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
              Nombre
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

  )
    ;
}
