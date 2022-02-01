import { Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';



export default function PurchaseOrderMakePayment() {


  return (
    <Page title='Orden Compra: Realizar pago | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Realizar pago'
          links={[
            { name: 'Ver', href: PATH_APP.purchasing.orders.root },
            { name: 'Realizar pago' }
          ]}

        />



      </Container>
    </Page>
  );
}
