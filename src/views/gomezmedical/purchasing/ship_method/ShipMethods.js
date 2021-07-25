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
import ShipMethodsList from './ShipMethodsList';


export default function ShipMethods() {


  return (
    <Page title='Metodos de envio: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Metodo de envio'
          links={[
            { name: 'Metodos de envio' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.purchasing.ship_methods.newShipMethod}
              startIcon={<Icon icon={plusFill} />}
            >
              Nuevo Método de envio
            </Button>
          }
        />

        <ShipMethodsList />

      </Container>
    </Page>
  );
}
