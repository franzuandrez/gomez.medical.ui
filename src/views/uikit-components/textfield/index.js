// material
import { Card, Container, CardHeader, CardContent } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// material
import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
//
import Filled from './Filled';
import Standard from './Standard';
import Outlined from './Outlined';

// ----------------------------------------------------------------------

export default function TextFieldComponent() {
  return (
    <Page title="Components: Text Field | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Text Field"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Text Field' }
          ]}
          moreLink="https://next.material-ui.com/components/text-fields"
        />
        <form noValidate autoComplete="off">
          <Card sx={{ mb: 3 }}>
            <CardHeader title="Outlined" />
            <CardContent>
              <Outlined />
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <CardHeader title="Standard" />
            <CardContent>
              <Standard />
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Filled" />
            <CardContent>
              <Filled />
            </CardContent>
          </Card>
        </form>
      </Container>
    </Page>
  );
}
