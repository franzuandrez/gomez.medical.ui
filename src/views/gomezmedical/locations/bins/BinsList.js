import { TableFooter, TablePagination } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import { useQuery } from 'react-query';
import { useState } from 'react';
import LoadingScreen from '../../../../components/LoadingScreen';

import apiBins from '../../../../services/api/locations/apiBins';
import { TablePaginationActions } from '../../components/TablePaginationActions';


export default function BinsList() {


  const [page, setPage] = useState(0);
  const { data, status, error } =
    useQuery(['bins', page], () => apiBins.getAll(`page=${page + 1}`), {
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
      <TableCell component='td' scope='row' colSpan={8}>
        <LoadingScreen />
      </TableCell>
    </TableRow>
    ;
  } else if (status === 'success') {

    content = data.data.map((bin) => (
      <TableRow
        key={`bin-${bin.bin_id}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='td' scope='row'>
          {bin.position.level.rack.corridor.section.warehouse.name}
        </TableCell>
        <TableCell component='td' scope='row'>
          {bin.position.level.rack.corridor.section.name}
        </TableCell>
        <TableCell component='td' scope='row'>
          {bin.position.level.rack.corridor.name}
        </TableCell>
        <TableCell component='td' scope='row'>
          {bin.position.level.rack.name}
        </TableCell>
        <TableCell component='td' scope='row'>
          {bin.position.level.name}
        </TableCell>
        <TableCell component='td' scope='row'>
          {bin.position.name}
        </TableCell>
        <TableCell component='td' scope='row'>
          {bin.name}
        </TableCell>


      </TableRow>

    ));
  } else if (status === 'error') {
    content = <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row' colSpan={8}>
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
              Bodega
            </TableCell>
            <TableCell>
              Sector
            </TableCell>
            <TableCell>
              Pasillo
            </TableCell>
            <TableCell>
              Rack
            </TableCell>
            <TableCell>
              Nivel
            </TableCell>
            <TableCell>
              Posicion
            </TableCell>
            <TableCell>
              Nombre
            </TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {content}

        </TableBody>
        <TableFooter>
          <TableRow>
            {status === 'success' && <TablePagination
              colSpan={7}
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
