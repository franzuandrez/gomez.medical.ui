import { Link, TableFooter, TablePagination, Card, LinearProgress } from '@material-ui/core';
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
import { TablePaginationActions } from '../../components/TablePaginationActions';
import ModalDelete from '../../components/ModalDelete';
import { MIconButton } from '../../../../components/@material-extend';
import apiSubcategories from '../../../../services/api/ecommerce/apiSubcategories';
import SearchBar from '../../components/SearchBar';


export default function SubCategoriesList() {


  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [filterName, setFilterName] = useState('');

  const { data, status, error, isFetching } =
    useQuery(['subcategories', page, query], () => apiSubcategories.getAll(`page=${page + 1}&query=${query}`), {
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
      <TableCell component='td' scope='row' colSpan={3}>
        <LoadingScreen />
      </TableCell>
    </TableRow>
    ;
  } else if (status === 'success') {

    content = data.data.map((subcategory) => (
      <TableRow
        key={`subcategory-${subcategory.product_subcategory_id}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >

        <TableCell component='td' scope='row'>
          {subcategory.category.name}
        </TableCell>
        <TableCell component='td' scope='row'>
          {subcategory.name}
        </TableCell>
        <TableCell component='td' scope='row' size='small'>
          <Link
            component={RouterLink}
            to={`${PATH_APP.products.subcategories.root}/${subcategory.product_subcategory_id}`}>
            <MIconButton color='secondary'>
              <EditIcon />
            </MIconButton>
          </Link>
          <ModalDelete item={subcategory.name}
                       itemId={subcategory.product_subcategory_id}
                       apiService={apiSubcategories}
          />
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
                Categoria
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
                rowsPerPageOptions={[15, { label: 'Todos', value: -1 }]}
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
