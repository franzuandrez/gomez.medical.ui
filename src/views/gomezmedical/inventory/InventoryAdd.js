import { useState } from 'react';

import {
  Card, CardContent, CardHeader, Container, Grid

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


  const handleFilterByName = async (event) => {

    try {
      const { value } = event ? event.target : '';
      setFilterName(event.target.value);
      if (value) {
        const response = await apiProducts.getAll(`page=1&query=${value}&perPage=1`);
        const products = response.data;
        setProduct(products.length > 0 ? products[0] : null);

      } else {
        setProduct(null);

      }
    } catch (error) {

      setProduct(null);
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
                      <InventoryAddForm product={product} />
                    </Grid>
                  </>) : (
                  <Grid item xs={12}>
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
