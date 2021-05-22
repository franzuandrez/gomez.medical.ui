// material
import { Card, Container, CardHeader, CardContent } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
//
import Switches from './Switches';
import Checkboxes from './Checkboxes';
import RadioButtons from './RadioButtons';

// ----------------------------------------------------------------------

export default function SelectionControlsComponent() {
  return (
    <Page title="Components: Selection Controls | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Selection Controls"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Selection Controls' }
          ]}
          moreLink={[
            'https://next.material-ui.com/components/checkboxes',
            'https://next.material-ui.com/components/radio-buttons',
            'https://next.material-ui.com/components/switches'
          ]}
        />

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Checkboxes" />
          <CardContent>
            <Checkboxes />
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Radio Buttons" />
          <CardContent>
            <RadioButtons />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Switches" />
          <CardContent>
            <Switches />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
