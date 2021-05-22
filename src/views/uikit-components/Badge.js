// material
import MailIcon from '@material-ui/icons/Mail';
import {
  Box,
  Grid,
  Card,
  Container,
  Typography,
  CardContent
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Block from '../../components/Block';
import { MBadge } from '../../components/@material-extend';
import HeaderDashboard from '../../components/HeaderDashboard';

// ----------------------------------------------------------------------

export default function BadgeComponent() {
  return (
    <Page title="Components: Badge | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Badge"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Badge' }
          ]}
          moreLink="https://next.material-ui.com/components/badges"
        />

        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Block title="Basic">
                  <MBadge badgeContent={4}>
                    <MailIcon />
                  </MBadge>
                  <MBadge badgeContent={4} color="primary">
                    <MailIcon />
                  </MBadge>
                  <MBadge badgeContent={4} color="secondary">
                    <MailIcon />
                  </MBadge>
                  <MBadge badgeContent={4} color="info">
                    <MailIcon />
                  </MBadge>
                  <MBadge badgeContent={4} color="success">
                    <MailIcon />
                  </MBadge>
                  <MBadge badgeContent={4} color="warning">
                    <MailIcon />
                  </MBadge>
                  <MBadge badgeContent={4} color="error">
                    <MailIcon />
                  </MBadge>
                </Block>
              </Grid>

              <Grid item xs={12} md={6}>
                <Block title="Maximum value">
                  <MBadge
                    badgeContent={99}
                    color="error"
                    children={<MailIcon />}
                  />
                  <MBadge
                    badgeContent={100}
                    color="error"
                    children={<MailIcon />}
                  />
                  <MBadge
                    badgeContent={1000}
                    max={999}
                    color="error"
                    children={<MailIcon />}
                  />
                </Block>
              </Grid>

              <Grid item xs={12} md={6}>
                <Block title="Dot badge">
                  <MBadge color="info" variant="dot">
                    <MailIcon />
                  </MBadge>
                  <MBadge color="info" variant="dot">
                    <Typography>Typography</Typography>
                  </MBadge>
                </Block>
              </Grid>

              <Grid item xs={12} md={6}>
                <Block title="Badge overlap">
                  <MBadge color="info" badgeContent=" ">
                    <Box
                      sx={{ width: 40, height: 40, bgcolor: 'warning.main' }}
                    />
                  </MBadge>
                  <MBadge color="info" badgeContent=" " variant="dot">
                    <Box
                      sx={{ width: 40, height: 40, bgcolor: 'warning.main' }}
                    />
                  </MBadge>
                  <MBadge color="info" overlap="circular" badgeContent=" ">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'warning.main'
                      }}
                    />
                  </MBadge>
                  <MBadge
                    color="info"
                    overlap="circular"
                    badgeContent=" "
                    variant="dot"
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'warning.main'
                      }}
                    />
                  </MBadge>
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
