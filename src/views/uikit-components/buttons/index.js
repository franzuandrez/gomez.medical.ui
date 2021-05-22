// components
import { Card, Container, CardHeader, CardContent } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
//
import TextButtons from './TextButtons';
import IconButtons from './IconButtons';
import ButtonGroups from './ButtonGroups';
import ToggleButtons from './ToggleButtons';
import OutlinedButtons from './OutlinedButtons';
import ContainedButtons from './ContainedButtons';
import FloatingActionButton from './FloatingActionButton';

// ----------------------------------------------------------------------

export default function ButtonsComponent() {
  return (
    <Page title="Components: Buttons | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Buttons"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Buttons' }
          ]}
          moreLink={[
            'https://next.material-ui.com/components/buttons',
            'https://next.material-ui.com/components/button-group',
            'https://next.material-ui.com/components/floating-action-button',
            'https://next.material-ui.com/components/toggle-button'
          ]}
        />

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Contained Buttons" />
          <CardContent>
            <ContainedButtons />
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Outlined Buttons" />
          <CardContent>
            <OutlinedButtons />
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Text Buttons" />
          <CardContent>
            <TextButtons />
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Icon Buttons" />
          <CardContent>
            <IconButtons />
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Floating Action Button" />
          <CardContent>
            <FloatingActionButton />
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Button Group" />
          <CardContent>
            <ButtonGroups />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Toggle Buttons" />
          <CardContent>
            <ToggleButtons />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
