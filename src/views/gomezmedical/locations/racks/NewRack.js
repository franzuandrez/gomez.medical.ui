import { Card, CardContent, Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';


import AddNewRackForm from './AddNewRackForm';


export default function newRack() {


  return (
    <Page title='Rack: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nuevo  Rack'
          links={[
            { name: 'Racks', href: PATH_APP.locations.corridors.root },
            { name: 'Crear' }
          ]}

        />
        <Card>
          <CardContent>
            <AddNewRackForm />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
