// material
import {
  Card,
  Grid,
  Container,
  CardHeader,
  CardContent
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderDashboard from '../../components/HeaderDashboard';
import {
  ChartPie,
  ChartBar,
  ChartLine,
  ChartArea,
  ChartMixed,
  ChartDonut,
  ChartsRadarBar,
  ChartRadialBar,
  ChartColumnSingle,
  ChartColumnStacked,
  ChartColumnNegative,
  ChartColumnMultiple
} from '../../components/charts';

// ----------------------------------------------------------------------

export default function Charts() {
  return (
    <Page title="Components: Charts | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Charts"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Charts' }
          ]}
          moreLink="https://apexcharts.com"
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Area" />
              <CardContent dir="ltr">
                <ChartArea />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Line" />
              <CardContent dir="ltr">
                <ChartLine />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Column Single" />
              <CardContent dir="ltr">
                <ChartColumnSingle />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Column Multiple" />
              <CardContent dir="ltr">
                <ChartColumnMultiple />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Column Stacked" />
              <CardContent dir="ltr">
                <ChartColumnStacked />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Column Negative" />
              <CardContent dir="ltr">
                <ChartColumnNegative />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Bar" />
              <CardContent dir="ltr">
                <ChartBar />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Mixed" />
              <CardContent dir="ltr">
                <ChartMixed />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Pie" />
              <CardContent
                sx={{
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChartPie />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Donut" />
              <CardContent
                sx={{
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChartDonut />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Radial Bar" />
              <CardContent
                sx={{
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChartRadialBar />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Radar" />
              <CardContent
                sx={{
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChartsRadarBar />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
