import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import SalesOrderList from './SalesOrderList';


export default function PurchaseOrders() {


  return (
    <Page title='Ventas: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Venta'
          links={[
            { name: 'Ventas' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.sales.orders.newOrder}
              startIcon={<Icon icon={plusFill} />}
            >
              Nueva
            </Button>
          }
        />

        <SalesOrderList
        />

      </Container>
    </Page>
  );
}
