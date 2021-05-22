// material
import {
  Grid,
  Card,
  Container,
  CardHeader,
  CardContent
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import {
  CarouselBasic1,
  CarouselBasic2,
  CarouselBasic3,
  CarouselBasic4,
  CarouselAnimation,
  CarouselThumbnail,
  CarouselCenterMode
} from '../../components/carousel';
import Page from '../../components/Page';
import HeaderDashboard from '../../components/HeaderDashboard';

// ----------------------------------------------------------------------

export default function Carousel() {
  return (
    <Page title="Components: Carousel | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Carousel"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Carousel' }
          ]}
          moreLink="https://react-slick.neostack.com"
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3 }}>
              <CardHeader title="Carousel Basic 1" />
              <CardContent>
                <CarouselBasic1 />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3 }}>
              <CardHeader title="Carousel Basic 2" />
              <CardContent>
                <CarouselBasic2 />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3 }}>
              <CardHeader title="Carousel Basic 3" />
              <CardContent>
                <CarouselBasic3 />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3 }}>
              <CardHeader title="Carousel Basic 4" />
              <CardContent>
                <CarouselBasic4 />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ mb: 3 }}>
              <CardHeader title="Carousel Thumbnail" />
              <CardContent>
                <CarouselThumbnail />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ mb: 3 }}>
              <CardHeader title="Carousel Center Mode" />
              <CardContent>
                <CarouselCenterMode />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title="Carousel Animation" />
              <CardContent>
                <CarouselAnimation />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
