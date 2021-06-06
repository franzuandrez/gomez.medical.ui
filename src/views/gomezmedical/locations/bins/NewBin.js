import { Card, CardContent, Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';


import AddNewBinForm from './AddNewBinForm';


export default function newBin() {


  return (
    <Page title='Bin: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nuevo Bin'
          links={[
            { name: 'Bins', href: PATH_APP.locations.bins.root },
            { name: 'Crear' }
          ]}

        />
        <Card>
          <CardContent>
            <AddNewBinForm />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
