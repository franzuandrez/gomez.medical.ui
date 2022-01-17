import { useState } from 'react';
import { useQuery } from 'react-query';
import { format } from 'date-fns';
import { Box, Link, TableFooter, TablePagination, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PaymentIcon from '@material-ui/icons/Payment';
import Label from '../../../components/Label';
import LoadingScreen from '../../../components/LoadingScreen';
import { PATH_APP } from '../../../routes/paths';
import { MIconButton } from '../../../components/@material-extend';
import apiControlCashRegister from '../../../services/api/cash_register/apiControlCashRegister';
import { TablePaginationActions } from '../components/TablePaginationActions';


export default function ControlCashRegisterList() {

  const theme = useTheme();
  const [page, setPage] = useState(0);
  const { data, status, error } = useQuery(['control_cash_register', page],
    () => apiControlCashRegister.getAll(`page=${page + 1}`), {
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
      <TableCell component='td' scope='row' colSpan={5}>
        <LoadingScreen />
      </TableCell>
    </TableRow>
    ;
  } else if (status === 'success') {

    content = data.data.map((control) => (
      <TableRow
        key={`control-cash-register-${control.id}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='td' scope='row'>
          {format(new Date(control.started_at), 'd/MM/Y H:mm:ss')}
        </TableCell>

        <TableCell component='td' scope='row'>
          <Box>
            <Typography
              noWrap
              variant='subtitle2'
              sx={{ maxWidth: 240 }}
            >
              {`${control.sales_person_first_name} ${control.sales_person_last_name}`}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >

              <Typography variant='body2'>
                <Typography
                  component='span'
                  variant='body2'
                  sx={{ color: 'text.secondary' }}
                >
                  Caja Registradora:&nbsp;
                </Typography>
                {control.cash_register}
              </Typography>
            </Box>
          </Box>

        </TableCell>

        <TableCell component='td' scope='row'>
          {control.shift_name}
        </TableCell>
        <TableCell component='td' scope='row'>

          <Label
            variant={
              theme.palette.mode === 'light'
                ? 'ghost'
                : 'filled'
            }
            color={
              (control.status === 'iniciado'  && 'warning') || 'success'
            }
          >
            {control.status}
          </Label>
        </TableCell>

        <TableCell component='td' scope='row' size='small'>
          <Link
            component={RouterLink}
            to={`${PATH_APP.cash_register_control.controls.root}/${control.id}`}>
            <MIconButton color='secondary'>
              <VisibilityIcon />
            </MIconButton>
          </Link>

          {control.status === 'iniciado' &&
          <Link
            component={RouterLink}
            to={`${PATH_APP.cash_register_control.controls.root}/end/${control.id}`}>
            <MIconButton color='primary'>
              <PaymentIcon />
            </MIconButton>
          </Link>
          }


        </TableCell>

      </TableRow>

    ));
  } else if (status === 'error') {
    content = <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='td' scope='row' colSpan={5}>
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
              Fecha
            </TableCell>
            <TableCell>
              Vendedor
            </TableCell>
            <TableCell>
              Turno
            </TableCell>
            <TableCell>
              Estado
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

  )
    ;
}
