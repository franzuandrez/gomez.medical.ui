// material
import { Card, Grid, Container, CardContent } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Block from '../../../components/Block';
import HeaderDashboard from '../../../components/HeaderDashboard';
//
import FormDialogs from './FormDialogs';
import AlertDialog from './AlertDialog';
import ScrollDialog from './ScrollDialog';
import SimpleDialogs from './SimpleDialogs';
import MaxWidthDialog from './MaxWidthDialog';
import FullScreenDialogs from './FullScreenDialogs';
import TransitionsDialogs from './TransitionsDialogs';

// ----------------------------------------------------------------------

export default function DialogComponent() {
  return (
    <Page title="Components: Dialog | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Dialog"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Dialog' }
          ]}
          moreLink="https://next.material-ui.com/components/dialogs"
        />

        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Block title="Simple">
                  <SimpleDialogs />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Alerts">
                  <AlertDialog />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Transitions">
                  <TransitionsDialogs />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Form">
                  <FormDialogs />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Full Screen">
                  <FullScreenDialogs />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Max Width Dialog">
                  <MaxWidthDialog />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Scrolling Content Dialogs">
                  <ScrollDialog />
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
