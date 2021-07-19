import { Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';



import VendorGeneralForm from './VendorGeneralForm';


export default function newVendor() {


  return (
    <Page title='Proveedor: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nuevo  Proveedor'
          links={[
            { name: 'Proveedores', href: PATH_APP.people.vendors.root },
            { name: 'Crear' }
          ]}

        />

        <VendorGeneralForm vendor={null}/>
    
      </Container>
    </Page>
  );
}
