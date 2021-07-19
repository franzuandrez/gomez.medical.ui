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
import VendorsList from './VendorsList';


export default function Vendors() {


  return (
    <Page title='Proveedor: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Proveedor'
          links={[
            { name: 'Proveedores' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.people.vendors.newVendor}
              startIcon={<Icon icon={plusFill} />}
            >
              Nuevo Proveedor
            </Button>
          }
        />

        <VendorsList />

      </Container>
    </Page>
  );
}
