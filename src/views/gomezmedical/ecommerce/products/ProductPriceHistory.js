import { format } from 'date-fns';
import { useQuery } from 'react-query';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import { LinearProgress } from '@material-ui/core';
import LoadingScreen from '../../../../components/LoadingScreen';
import apiPriceHistory from '../../../../services/api/prices/apiPriceHistory';
import { fCurrency } from '../../../../utils/formatNumber';
import Label from '../../../../components/Label';


export default function ProductPriceHistory({ product }) {


  const productId = product?.product_id;

  const { status, isFetching, data, error } = useQuery(['prices/history', productId],
    () => apiPriceHistory.getSingle(productId)
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      enabled: !!product?.product_id
    });


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
    content = data.data.map((price) => (
      <TableRow
        key={`price-${price.product_list_price_id}`}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component='td' scope='row'>
          {fCurrency(price.list_price)}
        </TableCell>
        <TableCell component='td' scope='row'>
          {format(new Date(price.start_date), 'd/MM/Y')}
        </TableCell>
        <TableCell component='td' scope='row'>
          {price.end_date && format(new Date(price.end_date), 'd/MM/Y')}
          {!price.end_date &&
          <Label
            color='success'
          >
            Actual
          </Label>
          }

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
    <TableContainer component={Paper}>
      {isFetching && <LinearProgress />}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Precio
            </TableCell>
            <TableCell>
              Inicio
            </TableCell>
            <TableCell>
              Fin
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {content}
        </TableBody>

      </Table>
    </TableContainer>
  )
    ;
};