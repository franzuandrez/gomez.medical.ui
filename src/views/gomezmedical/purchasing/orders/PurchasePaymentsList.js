import { useState } from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { TableFooter, TablePagination, Container, Card, Grid } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LoadingScreen from '../../../../components/LoadingScreen';
import apiPurchase from '../../../../services/api/purchasing/apiPurchase';
import { TablePaginationActions } from '../../components/TablePaginationActions';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import PurchaseOrderMakePayment from './PurchaseOrderMakePayment';


export default function PurchasePaymentsList() {


  const { id } = useParams();
  const [purchase, setPurchase] = useState(null);
  const [page, setPage] = useState(0);
  const { data, status, error } = useQuery(['purchases', page, id],
    async () => {
      const purchase = await apiPurchase.getSingle(id);
      setPurchase(purchase);
      return apiPurchase.nested(id);

    }, {
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
      <TableCell component='td' scope='row' colSpan={4}>
        <LoadingScreen />
      </TableCell>
    </TableRow>
    ;
  } else if (status === 'success') {

    content = data.data.map((payment) => (
      <TableRow
        key={`payment-${payment.id}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='td' scope='row'>
          {payment.payment_date}
        </TableCell>
        <TableCell component='td' scope='row'>
          {payment.doc_number_reference}
        </TableCell>
        <TableCell component='td' scope='row'>
          {payment.amount}
        </TableCell>
        <TableCell component='td' scope='row'>
          {payment.payment_type}
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
    <Page title='Orden Compra: Pagos | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Pagos'
          links={[
            { name: 'Ordenes', href: `${PATH_APP.purchasing.orders.root}` },
            { name: 'Ver', href: `${PATH_APP.purchasing.orders.root}/${purchase?.purchase_order_id}` },
            { name: 'Pagos' }
          ]}

        />
        <Grid container spacing={2}>
          {(purchase && purchase?.is_paid === 0) &&
          <Grid item xs={12} md={12}>
            <Card>
              <PurchaseOrderMakePayment
              purchase={purchase}
              total_paid={purchase.total_paid}
              />
            </Card>
          </Grid>
          }

          <Grid item xs={12} md={12}>
            <Card>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        Fecha
                      </TableCell>
                      <TableCell>
                        No. Documento
                      </TableCell>
                      <TableCell>
                        Monto
                      </TableCell>
                      <TableCell>
                        Tipo Pago
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
          </Grid>
        </Grid>

      </Container>
    </Page>
  )
    ;
}
