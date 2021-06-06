import { Card, CardContent, Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';


import AddNewPositionForm from './AddNewPositionForm';


export default function newPosition() {


  return (
    <Page title='Posicion: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nueva Posicion'
          links={[
            { name: 'Posiciones', href: PATH_APP.locations.positions.root },
            { name: 'Crear' }
          ]}

        />
        <Card>
          <CardContent>
            <AddNewPositionForm />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
