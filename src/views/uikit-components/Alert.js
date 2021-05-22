// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Card,
  Alert,
  Button,
  Container,
  AlertTitle,
  CardHeader,
  CardContent
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderDashboard from '../../components/HeaderDashboard';
import { MButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

const CardContentStyle = styled(CardContent)(({ theme }) => ({
  '& > *:not(:last-child)': {
    marginBottom: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function AlertsComponent() {
  return (
    <Page title="Components: Alert | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Alert"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Alert' }
          ]}
          moreLink="https://next.material-ui.com/components/alert"
        />

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Simple" />
          <CardContentStyle>
            <Alert severity="error" onClose={() => {}}>
              This is an error alert — check it out!
            </Alert>
            <Alert severity="warning" onClose={() => {}}>
              This is a warning alert — check it out!
            </Alert>
            <Alert severity="info">This is an info alert — check it out!</Alert>
            <Alert severity="success">
              This is a success alert — check it out!
            </Alert>
          </CardContentStyle>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Filled" />
          <CardContentStyle>
            <Alert variant="filled" severity="error" onClose={() => {}}>
              This is an error alert — check it out!
            </Alert>
            <Alert variant="filled" severity="warning" onClose={() => {}}>
              This is a warning alert — check it out!
            </Alert>
            <Alert variant="filled" severity="info">
              This is an info alert — check it out!
            </Alert>
            <Alert variant="filled" severity="success">
              This is a success alert — check it out!
            </Alert>
          </CardContentStyle>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Outlined" />
          <CardContentStyle>
            <Alert variant="outlined" severity="error" onClose={() => {}}>
              This is an error alert — check it out!
            </Alert>
            <Alert variant="outlined" severity="warning" onClose={() => {}}>
              This is a warning alert — check it out!
            </Alert>
            <Alert variant="outlined" severity="info">
              This is an info alert — check it out!
            </Alert>
            <Alert variant="outlined" severity="success">
              This is a success alert — check it out!
            </Alert>
          </CardContentStyle>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Description" />
          <CardContentStyle>
            <Alert severity="error" onClose={() => {}}>
              <AlertTitle>Error</AlertTitle>
              This is an error alert — <strong>check it out!</strong>
            </Alert>
            <Alert severity="warning">
              <AlertTitle>Warning</AlertTitle>
              This is a warning alert — <strong>check it out!</strong>
            </Alert>
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
              This is an info alert — <strong>check it out!</strong>
            </Alert>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              This is a success alert — <strong>check it out!</strong>
            </Alert>
          </CardContentStyle>
        </Card>

        <Card>
          <CardHeader title="Actions" />
          <CardContentStyle>
            <Alert
              severity="info"
              action={
                <MButton color="info" size="small" variant="outlined">
                  Undo
                </MButton>
              }
            >
              This is an info alert — check it out!
            </Alert>
            <Alert
              severity="info"
              variant="filled"
              action={
                <Button
                  color="inherit"
                  size="small"
                  variant="outlined"
                  sx={{
                    border: (theme) =>
                      `1px solid ${alpha(theme.palette.common.white, 0.48)}`
                  }}
                >
                  Undo
                </Button>
              }
            >
              This is an info alert — check it out!
            </Alert>
            <Alert
              severity="info"
              variant="outlined"
              action={
                <MButton color="info" size="small" variant="outlined">
                  Undo
                </MButton>
              }
            >
              This is an info alert — check it out!
            </Alert>
          </CardContentStyle>
        </Card>
      </Container>
    </Page>
  );
}
