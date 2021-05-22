import { useState } from 'react';
// material
import {
  Box,
  Card,
  Grid,
  Button,
  Popover,
  Container,
  CardHeader,
  Typography,
  CardContent
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Block from '../../components/Block';
import HeaderDashboard from '../../components/HeaderDashboard';

// ----------------------------------------------------------------------

export default function PopoversComponent() {
  const [click, setCLick] = useState(null);
  const [hover, setHover] = useState(null);

  const handleClick = (event) => {
    setCLick(event.currentTarget);
  };

  const handleClose = () => {
    setCLick(null);
  };

  const handleHoverOpen = (event) => {
    setHover(event.currentTarget);
  };

  const handleHoverClose = () => {
    setHover(null);
  };

  return (
    <Page title="Components: Popover | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Popover"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Popover' }
          ]}
          moreLink="https://next.material-ui.com/components/popover"
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Click" />
              <CardContent>
                <Block>
                  <Button variant="contained" onClick={handleClick}>
                    Open Popover
                  </Button>
                  <Popover
                    open={Boolean(click)}
                    anchorEl={click}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center'
                    }}
                  >
                    <Box sx={{ p: 2, maxWidth: 280 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Etiam feugiat lorem non metus
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                      >
                        Fusce vulputate eleifend sapien. Curabitur at lacus ac
                        velit ornare lobortis.
                      </Typography>
                    </Box>
                  </Popover>
                </Block>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Hover" />

              <CardContent>
                <Block>
                  <Typography
                    aria-owns={hover ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handleHoverOpen}
                    onMouseLeave={handleHoverClose}
                  >
                    Hover with a Popover.
                  </Typography>
                  <Popover
                    id="mouse-over-popover"
                    open={Boolean(hover)}
                    anchorEl={hover}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    onClose={handleHoverClose}
                    disableRestoreFocus
                    sx={{
                      pointerEvents: 'none'
                    }}
                  >
                    <Box sx={{ p: 2, maxWidth: 280 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Etiam feugiat lorem non metus
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                      >
                        Fusce vulputate eleifend sapien. Curabitur at lacus ac
                        velit ornare lobortis.
                      </Typography>
                    </Box>
                  </Popover>
                </Block>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
