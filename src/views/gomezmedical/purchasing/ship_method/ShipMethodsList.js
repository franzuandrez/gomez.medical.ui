import { LinearProgress, Link, TableFooter, TablePagination ,Card} from '@material-ui/core';
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
import { useQuery } from 'react-query';
import { useState } from 'react';
import LoadingScreen from '../../../../components/LoadingScreen';
import { PATH_APP } from '../../../../routes/paths';

import ModalDelete from '../../components/ModalDelete';
import { MIconButton } from '../../../../components/@material-extend';
import apiShipMethods from '../../../../services/api/purchasing/apiShipMethods';
import { TablePaginationActions } from '../../components/TablePaginationActions';
import SearchBar from '../../components/SearchBar';


export default function ShipMethodsList() {


  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [filterName, setFilterName] = useState('');

  const { data, status, error, isFetching } = useQuery(['vendors', page, query],
    () => apiShipMethods.getAll(`page=${page}&query=${query}`), {
      keepPreviousData: true
    });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleEnter = (event) => {

    if (event.which === 13) {
      setQuery(filterName);
    }
  };

  const handleFilterByName = (event) => {

    const { value } = event.target;
    setFilterName(event.target.value);
    if (value === '') {
      setQuery(value);
    }
  };


  let content;
  if (status === 'loading') {
    content = <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row' colSpan={2}>
        <LoadingScreen />
      </TableCell>
    </TableRow>
    ;
  } else if (status === 'success') {

    content = data.data.map((method) => (
      <TableRow
        key={`method-${method.ship_method_id}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='td' scope='row'>
          {method.name}
        </TableCell>

        <TableCell component='td' scope='row'>
          <Link
            component={RouterLink}
            to={`${PATH_APP.purchasing.ship_methods.root}/${method.ship_method_id}`}>
            <MIconButton color='secondary'>
              <EditIcon />
            </MIconButton>
          </Link>
          <ModalDelete item={method.name}
                       itemId={method.ship_method_id}
                       apiService={apiShipMethods}
          />
        </TableCell>

      </TableRow>

    ));
  } else if (status === 'error') {
    content = <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row' colSpan={2}>
        {error}
      </TableCell>
    </TableRow>;
  }

  return (
    <Card>
      <SearchBar
        filterName={filterName}
        onFilterName={handleFilterByName}
        onEnter={handleEnter}
      />
      {isFetching && <LinearProgress />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
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
          <TableFooter>
            <TableRow>
              {status === 'success' && <TablePagination
                colSpan={2}
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
    </Card>
  )
    ;
}
