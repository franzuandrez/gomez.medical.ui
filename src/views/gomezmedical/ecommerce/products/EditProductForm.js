
import {
  Container,
} from '@material-ui/core';

import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import { PATH_APP } from '../../../../routes/paths';

import AddNewProductForm from './AddNewProductForm';


export default function EditProductForm() {

  return (
    <Page title='Producto: Editar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Editar  Producto'
          links={[
            { name: 'Productos', href: PATH_APP.products.products.root },
            { name: 'Editar' }
          ]}

        />

        <AddNewProductForm
          isEdit
          currentProduct={null}
        />

      </Container>
    </Page>
  );

};
