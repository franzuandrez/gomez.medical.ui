import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useHistory } from 'react-router';

import {
  Grid,
  Card,
  Container,
  LinearProgress,
  CardHeader,
  CardContent
} from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import apiPurchase from '../../../../services/api/purchasing/apiPurchase';
import InventoryProductCarousel from '../../inventory/InventoryProductCarousel';
import PurchaseLocateProductForm from './PurchaseLocateProductForm';


export default function PurchaseLocateProduct() {

  const { id } = useParams();
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [trigger, setTrigger] = useState(null);
  const [loading, setIsLoading] = useState(false);

  const { isLoading } = useQuery(['purchase_locate', id, trigger],
    async () => {

      const data = await apiPurchase.getSingle(id);
      if (data.status === 'completada') {
        history.push(`${PATH_APP.purchasing.orders.root}/${id}`);
      } else {
        const productsFiltered = data.detail.filter((item => item.received_quantity !== item.stocked_quantity));
        setProducts(productsFiltered);
        setTrigger(trigger);
        setIsLoading(false);
      }
      return data;
    },
    {
      keepPreviousData: true
    }
  );


  const onPropertyChange = (result) => {
    setTrigger(result);
    setIsLoading(true);
  };
  return (
    <Page title='Orden: Ubicar |Gomez Medical'>
      <Container>
        <HeaderDashboard
          heading='Orden'
          links={[
            {
              name: 'Ordenes',
              href: PATH_APP.purchasing.orders.root
            },
            {
              name: 'Ver',
              href: `${PATH_APP.purchasing.orders.root}/${id}`
            },
            { name: 'Ubicar' }
          ]}
        />
        {isLoading ? (<LinearProgress />) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Card>
                <CardHeader
                  title='Ubicación de productos '
                />
                <CardContent>
                  <Grid container>
                    {loading && <LinearProgress />}
                    {
                      products.length === 0 ?
                        (
                          <div>Orden Ubicada</div>
                        ) : (products.map((row, index) => (
                          <Grid
                            key={index}
                            container
                            spacing={2}>

                            <Grid item xs={12} md={6} lg={7}>
                              <InventoryProductCarousel product={row.product} />
                            </Grid>
                            <Grid item xs={12} md={6} lg={5}>
                              <PurchaseLocateProductForm
                                onPropertyChange={onPropertyChange}
                                product={row.product}
                                id={row.id}
                                maxQty={row.received_quantity - row.stocked_quantity}
                              />


                            </Grid>
                          </Grid>

                        )))
                    }
                  </Grid>

                </CardContent>
              </Card>
            </Grid>

          </Grid>


        )}


      </Container>
    </Page>
  );
}
