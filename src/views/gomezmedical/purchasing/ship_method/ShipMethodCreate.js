import { Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';


import ShipMethodGeneralForm from './ShipMethodGeneralForm';


export default function ShipMethodCreate() {


  return (
    <Page title='Método de envío: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nuevo  Método de envío'
          links={[
            { name: 'Métodos de envío', href: PATH_APP.purchasing.ship_methods.root },
            { name: 'Crear' }
          ]}

        />

        <ShipMethodGeneralForm ship_method={null}

        />

      </Container>
    </Page>
  );
}
