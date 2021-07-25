import { Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';


import CustomerGeneralForm from './CustomerGeneralForm';


export default function CustomerCreate() {


  return (
    <Page title='Cliente: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nuevo  Cliente'
          links={[
            { name: 'Cientes', href: PATH_APP.people.customers.root },
            { name: 'Crear' }
          ]}

        />

        <CustomerGeneralForm customer={null}

        />

      </Container>
    </Page>
  );
}
