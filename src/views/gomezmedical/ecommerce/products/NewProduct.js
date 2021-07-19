import { Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';


import AddNewProductForm from './AddNewProductForm';


export default function newProduct() {


  return (
    <Page title='Producto: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nuevo  Producto'
          links={[
            { name: 'Productos', href: PATH_APP.products.products.root },
            { name: 'Crear' }
          ]}

        />

        <AddNewProductForm
          isEdit={false}
          currentProduct={null}
        />

      </Container>
    </Page>
  );
}
