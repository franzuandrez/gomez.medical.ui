import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';

// material
import { Grid, Button, Container } from '@material-ui/core';

// redux
// routes
import { PATH_APP } from '../../../../routes/paths';
// components
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import WarehousesList from './WarehousesList';



export default function Warehouses() {


  return (
    <Page title='Bodega: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Bodega'
          links={[
            { name: 'Bodegas' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.locations.warehouses.newWarehouse}
              startIcon={<Icon icon={plusFill} />}
            >
              Nueva Bodega
            </Button>
          }
        />

        <WarehousesList/>

      </Container>
    </Page>
  );
}
