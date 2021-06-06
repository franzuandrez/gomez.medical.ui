import { Card, CardContent, Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';


import AddNewLevelForm from './AddNewLevelForm';


export default function newLevel() {


  return (
    <Page title='Nivel: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nuevo  Nivel'
          links={[
            { name: 'Niveles', href: PATH_APP.locations.levels.root },
            { name: 'Crear' }
          ]}

        />
        <Card>
          <CardContent>
            <AddNewLevelForm />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
