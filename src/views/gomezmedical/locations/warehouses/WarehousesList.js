
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
// redux
import { getWarehouses } from '../../../../redux/slices/warehouse';



export default function WarehousesList() {

  const dispatch = useDispatch();
  const { warehouses } = useSelector((state) => state.warehouse);


  useEffect(() => {
    dispatch(getWarehouses());
  }, [dispatch]);

  return (

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              Nombre
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {warehouses.map((warehouse) => (
            <TableRow
              key={warehouse.warehouse_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='td' scope='row'>
                {warehouse.name}
              </TableCell>
              <TableCell component='td' scope='row'>
                <IconButton color='primary' aria-label='Editar'>
                  <EditIcon />
                </IconButton>
                <IconButton color='default' aria-label='Dar de baja'>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}
