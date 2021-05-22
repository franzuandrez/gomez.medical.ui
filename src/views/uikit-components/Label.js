// material
import { Grid, Card, Container, CardContent } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Block from '../../components/Block';
import Label from '../../components/Label';
import HeaderDashboard from '../../components/HeaderDashboard';

// ----------------------------------------------------------------------

export default function LabelsComponent() {
  return (
    <Page title="Components: Label | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Label"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Label' }
          ]}
        />

        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Block title="Filled">
                  <Label variant="filled"> Default</Label>
                  <Label variant="filled" color="primary">
                    Primary
                  </Label>
                  <Label variant="filled" color="info">
                    Info
                  </Label>
                  <Label variant="filled" color="success">
                    Success
                  </Label>
                  <Label variant="filled" color="warning">
                    Waring
                  </Label>
                  <Label variant="filled" color="error">
                    Error
                  </Label>
                </Block>
              </Grid>

              <Grid item xs={12}>
                <Block title="Outlined">
                  <Label variant="outlined"> Default</Label>
                  <Label variant="outlined" color="primary">
                    Primary
                  </Label>
                  <Label variant="outlined" color="info">
                    Info
                  </Label>
                  <Label variant="outlined" color="success">
                    Success
                  </Label>
                  <Label variant="outlined" color="warning">
                    Waring
                  </Label>
                  <Label variant="outlined" color="error">
                    Error
                  </Label>
                </Block>
              </Grid>

              <Grid item xs={12}>
                <Block title="Ghost">
                  <Label> Default</Label>
                  <Label color="primary">Primary</Label>
                  <Label color="info">Info</Label>
                  <Label color="success">Success</Label>
                  <Label color="warning">Waring</Label>
                  <Label color="error">Error</Label>
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
