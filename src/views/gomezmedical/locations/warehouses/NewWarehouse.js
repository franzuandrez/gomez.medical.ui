import { Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';


import AddNewWarehouseForm from './AddNewWarehouseForm';


export default function NewWarehouse() {


  return (
    <Page title='Bodega: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nueva  Bodega'
          links={[
            { name: 'Bodegas', href: PATH_APP.locations.warehouses.root },
            { name: 'Crear' }
          ]}

        />

        <AddNewWarehouseForm />

      </Container>
    </Page>
  );
}
