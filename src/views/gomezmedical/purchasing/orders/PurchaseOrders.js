import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';


export default function PurchaseOrders() {


  return (
    <Page title='Ordenes: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Orden'
          links={[
            { name: 'Ordenes' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.purchasing.orders.newOrder}
              startIcon={<Icon icon={plusFill} />}
            >
              Nueva Orden
            </Button>
          }
        />


      </Container>
    </Page>
  );
}
