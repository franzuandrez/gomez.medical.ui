import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  Container,
 LinearProgress
} from '@material-ui/core';

// routes
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import apiPurchase from '../../../../services/api/purchasing/apiPurchase';
import PurchaseOrderShowReceived from './PurchaseOrderShowReceived';
import PurchaseOrderShowPending from './PurchaseOrderShowPending';


export default function PurchaseOrderShow() {

  const { id } = useParams();

  const renderContent = (order) => {

    if (order.status === 'recepcionada') {
      return <PurchaseOrderShowReceived
        order={order}
      />;
    }
    return <PurchaseOrderShowPending order={order} />;
  };

  const { data: order, isLoading } = useQuery(['purchase', id],
    async () => {
      const data = await apiPurchase.getSingle(id);
      return data;
    }
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });


  return (
    <Page title='Orden: Ver | Minimal-UI'>
      <Container>
        <HeaderDashboard
          heading='Orden'
          links={[
            {
              name: 'Ordenes',
              href: PATH_APP.purchasing.orders.root
            },
            { name: 'Ver' }
          ]}
        />


        {isLoading ? (<LinearProgress />) : (
          renderContent(order)

        )}


      </Container>
    </Page>
  );
}
