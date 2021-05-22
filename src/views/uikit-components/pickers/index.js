// material
import { Card, Container, CardHeader, CardContent } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
//
import PickerDate from './PickerDate';
import PickerTime from './PickerTime';
import PickerDateTime from './PickerDateTime';
import PickerDateRange from './PickerDateRange';

// ----------------------------------------------------------------------

export default function PickersComponent() {
  return (
    <Page title="Components: Pickers | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Date / Time pickers"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Pickers' }
          ]}
          moreLink="https://next.material-ui.com/components/pickers"
        />

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Date picker" />
          <CardContent>
            <PickerDate />
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Date Time Picker" />
          <CardContent>
            <PickerDateTime />
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Date Range Picker" />
          <CardContent>
            <PickerDateRange />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Time Picker" />
          <CardContent>
            <PickerTime />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
