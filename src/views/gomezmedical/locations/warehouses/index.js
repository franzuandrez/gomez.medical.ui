import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// material
import { Grid, Button, Container } from '@material-ui/core';
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
// routes
import { PATH_APP } from '../../../../routes/paths';
// components
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';



export default function Index() {

  const dispatch = useDispatch();
  const { warehouses } = useSelector((state) => state.warehouse);


  useEffect(() => {
    dispatch(getWarehouses());
  }, [dispatch]);


  return (
    <Page title='Bodega: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Bodega'
          links={[
            { name: 'Listar' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.locations.warehouses.newWarehouse}
              startIcon={<Icon icon={plusFill} />}
            >
              Nueva Bodega
            </Button>
          }
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  Bodegas
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
                    <IconButton  color="primary"  aria-label="Editar">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="default"  aria-label="Dar de baja">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Container>
    </Page>
  );
}
