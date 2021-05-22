// material
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Box,
  Fab,
  Zoom,
  Card,
  Grid,
  Fade,
  Button,
  Tooltip,
  Container,
  IconButton,
  CardContent
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Block from '../../components/Block';
import HeaderDashboard from '../../components/HeaderDashboard';
import { MIconButton, MFab, MButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

const LONG_TEXT = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;

// ----------------------------------------------------------------------

export default function TooltipsComponent() {
  return (
    <Page title="Components: Tooltip | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Tooltip"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Tooltip' }
          ]}
          moreLink="https://next.material-ui.com/components/tooltips"
        />
        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Block title="Simple">
                  <Tooltip title="Delete">
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Add">
                    <Fab>
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <MIconButton color="info">
                      <DeleteIcon />
                    </MIconButton>
                  </Tooltip>
                  <Tooltip title="Add">
                    <MFab color="info">
                      <AddIcon />
                    </MFab>
                  </Tooltip>
                  <Tooltip title="Add">
                    <MButton variant="outlined" color="info">
                      Button
                    </MButton>
                  </Tooltip>
                </Block>
              </Grid>

              <Grid item xs={12} md={6}>
                <Block title="Arrow">
                  <Tooltip title="Add" arrow>
                    <Fab>
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                </Block>
              </Grid>

              <Grid item xs={12} md={6}>
                <Block title="Variable Width">
                  <Tooltip title={LONG_TEXT}>
                    <Button color="inherit">Default Width [300px]</Button>
                  </Tooltip>
                  <Tooltip title={LONG_TEXT} sx={{ maxWidth: 500 }}>
                    <Button color="inherit">Custom Width [500px]</Button>
                  </Tooltip>
                  <Tooltip title={LONG_TEXT} sx={{ maxWidth: 'none' }}>
                    <Button color="inherit">No wrapping</Button>
                  </Tooltip>
                </Block>
              </Grid>

              <Grid item xs={12} md={6}>
                <Block title="Transitions">
                  <Tooltip title="Add">
                    <Button color="inherit">Grow</Button>
                  </Tooltip>
                  <Tooltip
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                    title="Add"
                  >
                    <Button color="inherit">Fade</Button>
                  </Tooltip>
                  <Tooltip TransitionComponent={Zoom} title="Add">
                    <Button color="inherit">Zoom</Button>
                  </Tooltip>
                </Block>
              </Grid>

              <Grid item xs={12}>
                <Block title="Positioned">
                  <Box sx={{ maxWidth: 560, margin: 'auto' }}>
                    <Grid container>
                      <Grid item>
                        <Tooltip title="Add" placement="top-start">
                          <Button color="inherit">top-start</Button>
                        </Tooltip>
                        <Tooltip title="Add" placement="top">
                          <Button color="inherit">top</Button>
                        </Tooltip>
                        <Tooltip title="Add" placement="top-end">
                          <Button color="inherit">top-end</Button>
                        </Tooltip>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={6}>
                        <Tooltip title="Add" placement="left-start">
                          <Button color="inherit">left-start</Button>
                        </Tooltip>
                        <br />
                        <Tooltip title="Add" placement="left">
                          <Button color="inherit">left</Button>
                        </Tooltip>
                        <br />
                        <Tooltip title="Add" placement="left-end">
                          <Button color="inherit">left-end</Button>
                        </Tooltip>
                      </Grid>
                      <Grid
                        item
                        container
                        xs={6}
                        alignItems="flex-end"
                        direction="column"
                      >
                        <Grid item>
                          <Tooltip title="Add" placement="right-start">
                            <Button color="inherit">right-start</Button>
                          </Tooltip>
                        </Grid>
                        <Grid item>
                          <Tooltip title="Add" placement="right">
                            <Button color="inherit">right</Button>
                          </Tooltip>
                        </Grid>
                        <Grid item>
                          <Tooltip title="Add" placement="right-end">
                            <Button color="inherit">right-end</Button>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item>
                        <Tooltip title="Add" placement="bottom-start">
                          <Button color="inherit">bottom-start</Button>
                        </Tooltip>
                        <Tooltip title="Add" placement="bottom">
                          <Button color="inherit">bottom</Button>
                        </Tooltip>
                        <Tooltip title="Add" placement="bottom-end">
                          <Button color="inherit">bottom-end</Button>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Box>
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
