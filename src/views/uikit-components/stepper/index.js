// material
import {
  Card,
  Paper,
  Container,
  CardHeader,
  CardContent
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Block from '../../../components/Block';
import HeaderDashboard from '../../../components/HeaderDashboard';
//
import CustomizedStepper from './CustomizedStepper';
import VerticalLinearStepper from './VerticalLinearStepper';
import LinearAlternativeLabel from './LinearAlternativeLabel';
import HorizontalLinearStepper from './HorizontalLinearStepper';

// ----------------------------------------------------------------------

export default function StepperComponent() {
  return (
    <Page title="Components: StepperView | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Stepper"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Stepper', href: '#' }
          ]}
          moreLink="https://next.material-ui.com/components/steppers"
        />

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Horizontal Linear Stepper" />
          <CardContent>
            <Block>
              <Paper
                sx={{
                  p: 3,
                  width: '100%',
                  boxShadow: (theme) => theme.customShadows.z8
                }}
              >
                <HorizontalLinearStepper />
              </Paper>
            </Block>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Linear Alternative Label" />
          <CardContent>
            <Block>
              <Paper
                sx={{
                  p: 3,
                  width: '100%',
                  boxShadow: (theme) => theme.customShadows.z8
                }}
              >
                <LinearAlternativeLabel />
              </Paper>
            </Block>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Vertical Linear Stepper" />
          <CardContent>
            <Block>
              <Paper
                sx={{
                  p: 3,
                  width: '100%',
                  boxShadow: (theme) => theme.customShadows.z8
                }}
              >
                <VerticalLinearStepper />
              </Paper>
            </Block>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Customized Stepper" />
          <CardContent>
            <Block>
              <Paper
                sx={{
                  p: 3,
                  width: '100%',
                  boxShadow: (theme) => theme.customShadows.z8
                }}
              >
                <CustomizedStepper />
              </Paper>
            </Block>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
