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
import apiPurchaseDetail from '../../../../services/api/purchasing/apiPurchaseDetail';
import SearchBar from '../../components/SearchBar';


export default function PurchaseLocateProduct() {

  const { id } = useParams();
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [trigger, setTrigger] = useState(null);
  const [query, setQuery] = useState('');
  const [filterName, setFilterName] = useState('');
  const [loading, setIsLoading] = useState(false);

  const { isLoading,data:purchaseHeader } = useQuery(['purchase_locate', id, trigger, query],
    async () => {

      const purchaseHeader = await apiPurchase.getSingle(id);
      const purchaseDetail = await apiPurchaseDetail.getAll(`purchase_order_id=${id}&query=${query}`);

      if (purchaseHeader.status === 'completada') {
        history.push(`${PATH_APP.purchasing.orders.root}/${id}`);
      } else {
        const productsFiltered = purchaseDetail.data.filter((item => item.received_quantity !== item.stocked_quantity));
        setProducts(productsFiltered);
        setTrigger(trigger);
        setIsLoading(false);
      }
      return purchaseHeader;
    },
    {
      keepPreviousData: true
    }
  );


  const onPropertyChange = (result) => {
    setTrigger(result);
    setIsLoading(true);
  };

  const handleEnter = (event) => {

    if (event.which === 13) {
      setQuery(filterName);
    }
  };

  const handleFilterName = (event) => {

    setFilterName(event.target.value);
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
                    <SearchBar
                      onEnter={handleEnter}
                      onFilterName={handleFilterName}
                      filterName={filterName}
                    />
                    {
                      purchaseHeader.status === 'completada' ?
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
