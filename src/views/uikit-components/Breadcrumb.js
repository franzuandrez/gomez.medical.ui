// material
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import {
  Link,
  Card,
  Grid,
  Container,
  Typography,
  CardContent,
  Breadcrumbs
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Block from '../../components/Block';
import HeaderDashboard from '../../components/HeaderDashboard';
import { MBreadcrumbs } from '../../components/@material-extend';

// ----------------------------------------------------------------------

export default function BreadcrumbComponent() {
  return (
    <Page title="Components: Breadcrumbs | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Breadcrumbs"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Breadcrumbs' }
          ]}
          moreLink="https://next.material-ui.com/components/breadcrumbs"
        />

        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Block title="Text">
                  <Breadcrumbs>
                    <Link color="inherit" href="#">
                      Material-UI
                    </Link>
                    <Link color="inherit" href="#">
                      Core
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>
                      Breadcrumb
                    </Typography>
                  </Breadcrumbs>
                </Block>
              </Grid>

              <Grid item xs={12} md={6}>
                <Block title="With Icon">
                  <Breadcrumbs>
                    <Link
                      color="inherit"
                      href="#"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <HomeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                      Material-UI
                    </Link>
                    <Link
                      color="inherit"
                      href="#"
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      <WhatshotIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                      Core
                    </Link>
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'text.primary'
                      }}
                    >
                      <GrainIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                      Breadcrumb
                    </Typography>
                  </Breadcrumbs>
                </Block>
              </Grid>

              <Grid item xs={12}>
                <Block title="Customized">
                  <MBreadcrumbs
                    links={[
                      { name: 'Home', href: '#', icon: <HomeIcon /> },
                      { name: 'Link1', href: '#', icon: <WhatshotIcon /> },
                      { name: 'Link2', href: '#', icon: <WhatshotIcon /> },
                      { name: 'Link3', href: '#', icon: <WhatshotIcon /> },
                      { name: 'Link4', href: '#', icon: <WhatshotIcon /> },
                      { name: 'Link5', href: '#', icon: <WhatshotIcon /> }
                    ]}
                  />
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
