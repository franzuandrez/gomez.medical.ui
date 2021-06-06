import { Card, CardContent, Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';


import AddNewCorridorForm from './AddNewCorridorForm';


export default function newCorridor() {


  return (
    <Page title='Pasillo: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nuevo  Pasillo'
          links={[
            { name: 'Pasillos', href: PATH_APP.locations.corridors.root },
            { name: 'Crear' }
          ]}

        />
        <Card>
          <CardContent>
            <AddNewCorridorForm />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
