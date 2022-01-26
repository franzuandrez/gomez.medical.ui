import { useState } from 'react';
import { useQuery } from 'react-query';
import {
  Card, CardContent, CardHeader, Container, Grid, LinearProgress

} from '@material-ui/core';

import HeaderDashboard from '../../../components/HeaderDashboard';
import SearchNotFound from '../../../components/SearchNotFound';
import ProductSearchBar from '../ecommerce/products/ProductSearchBar';
import InventoryProductCarousel from './InventoryProductCarousel';
import InventoryAddForm from './InventoryAddForm';
import apiProducts from '../../../services/api/ecommerce/apiProducts';
import Page from '../../../components/Page';
import { PATH_APP } from '../../../routes/paths';


export default function InventoryAdd() {


  const [filterName, setFilterName] = useState('');
  const [product, setProduct] = useState(null);
  const [query, setQuery] = useState('');

  const { isLoading } = useQuery(
    ['products', query],
    async () => {
      const response = await apiProducts.getAll(`page=1&query=${query}&perPage=1`);
      const products = response.data;
      setProduct(products.length > 0 ? products[0] : null);
    },
    {
      enabled: !!query,
      keepPreviousData: true,
      refetchOnWindowFocus: false
    }
  );


  const handleFilterByName = (event) => {

    try {
      const { value } = event ? event.target : '';
      setFilterName(value);


    } catch (error) {

      setProduct(null);
    }

  };

  const onEnter = (e) => {

    if (e.which === 13) {
      setQuery(filterName);
      e.target.select();
    }

  };


  return (
    <Page title='Inventario: Agregar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Ingresar Inventario'
          links={[
            { name: 'Inventario', href: PATH_APP.inventory.addInventory },
            { name: 'Ingresar' }
          ]}
        />

        <Grid item xs={12} md={12}>

          <Card>
            <CardHeader
              title='Productos'
            />
            <CardContent>

              <Grid container>
                <Grid item xs={12}
                >

                  <ProductSearchBar
                    filterName={filterName}
                    onEnter={onEnter}
                    onFilterName={handleFilterByName}

                  />

                </Grid>

                {product ? (
                  <>
                    <Grid item xs={12} md={6} lg={7}
                    >
                      <InventoryProductCarousel product={product} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={5}>

                      <InventoryAddForm product={product}


                      />
                    </Grid>
                  </>) : (
                  <Grid item xs={12}>
                    {isLoading && <LinearProgress />}
                    <SearchNotFound searchQuery={filterName}
                    />
                  </Grid>

                )
                }


              </Grid>


            </CardContent>
          </Card>

        </Grid>

      </Container>
    </Page>
  )
    ;
}
