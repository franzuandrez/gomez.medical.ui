import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';

// material
import { Button, Container } from '@material-ui/core';

// redux
// routes
import { PATH_APP } from '../../../../routes/paths';
// components
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import ProductsList from './ProductsList';


export default function Products() {


  return (
    <Page title='Productos : Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Producto'
          links={[
            { name: 'Productos' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.products.products.newProduct}
              startIcon={<Icon icon={plusFill} />}
            >
              Nuevo Producto
            </Button>
          }
        />

        <ProductsList />

      </Container>
    </Page>
  );
}
