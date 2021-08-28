import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  Container,
  LinearProgress,
  TableRow
} from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import apiSales from '../../../../services/api/sales/apiSales';
import SalesDetailProducts from './SalesDetailProducts';



export default function SalesOrderShow() {

  const { id } = useParams();


  const { data: order, isLoading } = useQuery(['sales', id],
    async () => {
      const data = await apiSales.getSingle(id);
      return data;
    }
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });


  return (
    <Page title='Ventas: Ver | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Venta'
          links={[
            {
              name: 'Ventas',
              href: PATH_APP.sales.orders.root
            },
            { name: 'Ver' }
          ]}
        />

        {isLoading ? (<LinearProgress />) :
          (
            <SalesDetailProducts
              order={order}
            />
          )
        }


      < /Container>
    </Page>
  );
}
