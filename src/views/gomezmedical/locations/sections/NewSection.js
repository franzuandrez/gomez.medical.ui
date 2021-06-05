import { Card, CardContent, Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';


import AddNewSectionForm from './AddNewSectionForm';


export default function newSection() {


  return (
    <Page title='Sector: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nuevo  Sector'
          links={[
            { name: 'Sectores', href: PATH_APP.locations.sections.root },
            { name: 'Crear' }
          ]}

        />
        <Card>
          <CardContent>
            <AddNewSectionForm />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
