import { LinearProgress, Link, TableFooter, TablePagination, Card } from '@material-ui/core';
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

import { MIconButton } from '../../../../components/@material-extend';
import apiCustomers from '../../../../services/api/people/apiCustomers';
import { TablePaginationActions } from '../../components/TablePaginationActions';
import SearchBar from '../../components/SearchBar';


export default function CustomersList() {

  const [filterName, setFilterName] = useState('');
  const [query, setQuery] = useState('');

  const [page, setPage] = useState(0);
  const { data, status, error, isFetching } = useQuery(['customers', page, query],
    () => apiCustomers.getAll(`page=${page + 1}&query=${query}`), {
      keepPreviousData: true
    });


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleFilterByName = (event) => {

    setFilterName(event.target.value);


  };
  const handleEnter = (event) => {

    if (event.which === 13) {
      setQuery(filterName);
    }


  };


  let content;
  if (status === 'loading') {
    content = <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row' colSpan={3}>
        <LoadingScreen />
      </TableCell>
    </TableRow>
    ;
  } else if (status === 'success') {

    content = data.data.map((customer) => (
      <TableRow
        key={`customer-${customer.customer_id}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='td' scope='row'>

          {customer.nit}
        </TableCell>
        <TableCell component='td' scope='row'>
          {`${customer.person?.first_name ?? ''}  ${customer.person?.last_name ?? ''}  ${customer.business_name ?? ''}`}
        </TableCell>

        <TableCell component='td' scope='row' size='small'>
          <Link
            component={RouterLink}
            to={`${PATH_APP.people.customers.root}/${customer.customer_id}`}>
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
      <TableCell component='td' scope='row' colSpan={3}>
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
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>
                Nit
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
                colSpan={3}
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
