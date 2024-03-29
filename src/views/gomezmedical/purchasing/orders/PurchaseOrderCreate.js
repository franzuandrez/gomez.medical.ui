import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { sum } from 'lodash';
import { Card, CardContent, CardHeader, Container, Grid, LinearProgress } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import VendorsSearchBox from '../../people/vendors/VendorsSearchBox';
import PurchaseProductCard from './PurchaseProductCard';
import apiVendorProducts from '../../../../services/api/people/apiVendorProducts';
import PurchaseCartWidget from './PurchaseCartWidget';
import SearchBar from '../../components/SearchBar';


export default function PurchaseOrderCreate() {

  const { checkout } = useSelector(
    (state) => state.purchase
  );
  const [vendorId, setVendorId] = useState('');
  const [vendor, setVendor] = useState(null);
  const totalItems = sum(checkout.cart.map((item) => parseInt(item.quantity, 10)));
  const [query, setQuery] = useState('');
  const [filterName, setFilterName] = useState('');

  const { data: products, isLoading } = useQuery(['ship_method', vendorId, query],
    () => apiVendorProducts.custom(`v1/vendors/${vendorId}/products?query=${query}`),
    {
      enabled: !!vendorId
    }
  );

  const handleVendorChange = async (event, newValue) => {

    if (newValue) {
      setVendorId(newValue.vendor_id);
      setVendor(newValue);
    }

  };


  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };
  const handleEnter = (event) => {


    if (event.which === 13) {
      setQuery(filterName);
    }
  };


  return (
    <Page title='Orden: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nueva Orden'
          links={[
            { name: 'Ordenes', href: PATH_APP.purchasing.orders.root },
            { name: 'Crear pedido' }
          ]}

        />

        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Card>
              <CardHeader title='Proveedor' />
              <CardContent>
                <VendorsSearchBox
                  onChange={handleVendorChange}

                />


              </CardContent>


            </Card>
          </Grid>
          <Grid item xs={12} md={12}>
            <Card>
              <CardHeader title='Productos' />
              {isLoading && <LinearProgress />}
              <CardContent>
                <SearchBar
                  onEnter={handleEnter}
                  filterName={filterName}
                  onFilterName={handleFilterName}
                />
                <Grid container spacing={3}>
                  {products && products.map((product) => (
                    <Grid key={product.product.product_id} item xs={12} sm={6} md={3}>
                      <PurchaseProductCard
                        vendor={vendor}
                        id={product.product.product_id}
                        cost={product.cost}
                        name={product.product.name}
                        size={product.product.size}
                        color={product.product.color}
                        cover={product.product.images.length > 0 ? product.product.images[0].path :  '/static/mock-images/no-image.png'}
                      />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <PurchaseCartWidget length={totalItems} />

      </Container>
    </Page>
  );
}
