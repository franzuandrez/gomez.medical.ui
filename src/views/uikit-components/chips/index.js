// material
import {
  Grid,
  Card,
  Container,
  CardHeader,
  CardContent
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
//
import ChipFilled from './ChipFilled';
import ChipOutlined from './ChipOutlined';

// ----------------------------------------------------------------------

export default function ChipsComponent() {
  return (
    <Page title="Components: Chip | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Chip"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Chip' }
          ]}
          moreLink="https://next.material-ui.com/components/chips"
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Filled" />
              <CardContent>
                <ChipFilled />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Outlined" />
              <CardContent>
                <ChipOutlined />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
