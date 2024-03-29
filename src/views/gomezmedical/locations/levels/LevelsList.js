import { Link, TableFooter, TablePagination } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import EditIcon from '@material-ui/icons/Edit';
// redux
import { useState } from 'react';
import { useQuery } from 'react-query';
import LoadingScreen from '../../../../components/LoadingScreen';
import { PATH_APP } from '../../../../routes/paths';

import ModalDelete from '../../components/ModalDelete';
import { MIconButton } from '../../../../components/@material-extend';
import apiLevels from '../../../../services/api/locations/apiLevels';
import { TablePaginationActions } from '../../components/TablePaginationActions';


export default function LevelsList() {

  const [page, setPage] = useState(0);
  const { data, status, error } = useQuery(['levels', page],
    () => apiLevels.getAll(`page=${page + 1}`), {
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
      <TableCell component='td' scope='row' colSpan={6}>
        <LoadingScreen />
      </TableCell>
    </TableRow>
    ;
  } else if (status === 'success') {

    content = data.data.map((level) => (
      <TableRow
        key={`level-${level.level_id}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='td' scope='row'>
          {level.rack.corridor.section.warehouse.name}
        </TableCell>
        <TableCell component='td' scope='row'>
          {level.rack.corridor.section.name}
        </TableCell>
        <TableCell component='td' scope='row'>
          {level.rack.corridor.name}
        </TableCell>
        <TableCell component='td' scope='row'>
          {level.rack.name}
        </TableCell>
        <TableCell component='td' scope='row'>
          {level.name}
        </TableCell>
        <TableCell component='td' scope='row' size='small'>
          <Link
            component={RouterLink}
            to={`${PATH_APP.locations.levels.root}/${level.level_id}`}>
            <MIconButton color='secondary'>
              <EditIcon />
            </MIconButton>
          </Link>
          <ModalDelete item={level.name}
                       itemId={level.level_id}
                       apiService={apiLevels}
          />
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

  )
    ;
}
