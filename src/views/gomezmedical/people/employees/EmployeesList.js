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
import { useQuery } from 'react-query';
import { useState } from 'react';
import LoadingScreen from '../../../../components/LoadingScreen';
import { PATH_APP } from '../../../../routes/paths';
import { MIconButton } from '../../../../components/@material-extend';
import apiEmployee from '../../../../services/api/people/apiEmployee';
import { TablePaginationActions } from '../../components/TablePaginationActions';
import SearchBar from '../../components/SearchBar';


export default function EmployeesList() {

  const [filterName, setFilterName] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const { data, status, error, isFetching } = useQuery(['employees', page, query],
    () => apiEmployee.getAll(`page=${page + 1}&query=${query}`), {
      keepPreviousData: true
    });


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleFilterByName = (event) => {

    setFilterName(event.target.value);


  };
  const handleEnter = (event) => {

    if (event.keyCode === 13) {
      setQuery(filterName);
    }


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

    content = data.data.map((employee) => (
      <TableRow
        key={`employee-${employee.employee_id}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='td' scope='row'>
          {employee.national_id_number}
        </TableCell>
        <TableCell component='td' scope='row'>
          {`${employee.first_name ?? ''}  ${employee.last_name ?? ''} `}
        </TableCell>
        <TableCell component='td' scope='row'>
          {employee.job_title}
        </TableCell>

        <TableCell component='td' scope='row' size='small'>
          <Link
            component={RouterLink}
            to={`${PATH_APP.people.employees.root}/${employee.employee_id}`}>
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
      <TableCell component='td' scope='row' colSpan={4}>
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
                DPI
              </TableCell>
              <TableCell>
                Nombre
              </TableCell>
              <TableCell>
                Puesto
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
    </Card>
  )
    ;
}
