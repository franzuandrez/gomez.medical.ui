import { format } from 'date-fns';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,

  Card,
  Container,
  LinearProgress, Link,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow

} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import EditIcon from '@material-ui/icons/RemoveRedEye';
import { PATH_APP } from '../../../../routes/paths';
import { MIconButton } from '../../../../components/@material-extend';

// components
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import Scrollbar from '../../../../components/Scrollbar';
import apiInventoryManagement from '../../../../services/api/inventory/apiInventoryManagement';
import LoadingScreen from '../../../../components/LoadingScreen';
import { TablePaginationActions } from '../../components/TablePaginationActions';
import SearchBar from '../../components/SearchBar';



// ----------------------------------------------------------------------




export default function PhysicalInventory() {


  const [page, setPage] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [query, setQuery] = useState('');

  const { data, status, error, isFetching } =
    useQuery(['physical_inventory', page, query], () => apiInventoryManagement.getAll(`page=${page + 1}&query=${query}`), {
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
      event.target.select();
    }


  };


  const renderContent = () => {

    if (status === 'loading') {
      return <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='td' scope='row' colSpan={6}>
          <LoadingScreen />
        </TableCell>
      </TableRow>
        ;
    }
    if (status === 'success') {
      return data.data.map((stock) => (
        <TableRow
          key={`stock-${stock.id}`}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component='td' scope='row'>
            {format(new Date(stock.start_date),'H:m:s a dd/MM/Y')}
          </TableCell>
          <TableCell>
            {format(new Date(stock.end_date),'H:m:s a dd/MM/Y')}
          </TableCell>
          <TableCell>
            {stock.status}
          </TableCell>
          <TableCell>
            {stock.type}
          </TableCell>
          <TableCell>
            {stock.first_name}  {stock.last_name}
          </TableCell>
          <TableCell>
            <Link
              component={RouterLink}
              to={`${PATH_APP.inventory.physicalInventory}/${stock.id}`}>
              <MIconButton color='secondary'>
                <EditIcon />
              </MIconButton>
            </Link>
          </TableCell>
        </TableRow>
      ));
    }
    return <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row' colSpan={6}>
        {error}
      </TableCell>
    </TableRow>;

  };

  return (
    <Page title='Inventario Físico: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Inventario Físico'
          links={[
            { name: 'Físico' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.inventory.physicalInventoryNew}
              startIcon={<Icon icon={plusFill} />}
            >
              Iniciar Nuevo Inventario Físico
            </Button>
          }
        />

        <Card>
          <SearchBar
            filterName={filterName}
            onFilterName={handleFilterByName}
            onEnter={handleEnter}
          />
          {isFetching && <LinearProgress />}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Fecha Inicio
                    </TableCell>
                    <TableCell>
                      Fecha fin
                    </TableCell>
                    <TableCell>
                      Estado
                    </TableCell>
                    <TableCell>
                      Tipo
                    </TableCell>
                    <TableCell>
                      Responsable
                    </TableCell>
                    <TableCell>
                      Opciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    renderContent()
                  }
                </TableBody>
                <TableFooter>
                  <TableRow>
                    {status === 'success' && <TablePagination
                      colSpan={6}
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
          </Scrollbar>
        </Card>


      </Container>
    </Page>
  );
}
