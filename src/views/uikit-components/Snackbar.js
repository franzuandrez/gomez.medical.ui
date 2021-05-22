import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import {
  Card,
  Grid,
  Button,
  Container,
  Typography,
  IconButton,
  CardContent
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Block from '../../components/Block';
import { MButton } from '../../components/@material-extend';
import HeaderDashboard from '../../components/HeaderDashboard';

// ----------------------------------------------------------------------

export default function SnackbarComponent() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSnackbarClose = (color) => {
    enqueueSnackbar(
      <div>
        <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
          {color}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This is an {color}
        </Typography>
      </div>,
      {
        variant: color,
        action: (key) => (
          <IconButton
            size="small"
            color="inherit"
            onClick={() => closeSnackbar(key)}
          >
            <Icon icon={closeFill} width={24} height={24} />
          </IconButton>
        )
      }
    );
  };

  const onSnackbarAction = (color, anchor) => {
    enqueueSnackbar(`This is an ${color}`, {
      variant: color,
      anchorOrigin: anchor,
      action: (key) => (
        <>
          <Button
            size="small"
            color={color !== 'default' ? color : 'primary'}
            onClick={() => {
              alert(`I belong to snackbar with key ${key}`);
            }}
          >
            Alert
          </Button>
          <Button
            size="small"
            color="inherit"
            onClick={() => closeSnackbar(key)}
          >
            Dismiss
          </Button>
        </>
      )
    });
  };

  return (
    <Page title="Components: Snackbar | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Snackbar"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Snackbar' }
          ]}
          moreLink={[
            'https://next.material-ui.com/components/snackbars',
            'https://www.iamhosseindhv.com/notistack'
          ]}
        />

        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Block title="Simple">
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => enqueueSnackbar('This is an default')}
                  >
                    Default
                  </Button>
                  <MButton
                    variant="contained"
                    color="info"
                    onClick={() =>
                      enqueueSnackbar('This is an info', { variant: 'info' })
                    }
                  >
                    Info
                  </MButton>
                  <MButton
                    variant="contained"
                    color="success"
                    onClick={() =>
                      enqueueSnackbar('This is an success', {
                        variant: 'success'
                      })
                    }
                  >
                    Success
                  </MButton>
                  <MButton
                    variant="contained"
                    color="warning"
                    onClick={() =>
                      enqueueSnackbar('This is an warning', {
                        variant: 'warning'
                      })
                    }
                  >
                    Warning
                  </MButton>
                  <MButton
                    variant="contained"
                    color="error"
                    onClick={() =>
                      enqueueSnackbar('This is an error', { variant: 'error' })
                    }
                  >
                    Error
                  </MButton>
                </Block>
              </Grid>

              <Grid item xs={12} md={6}>
                <Block title="With Close">
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => onSnackbarClose('default')}
                  >
                    Default
                  </Button>
                  <MButton
                    variant="contained"
                    color="info"
                    onClick={() => onSnackbarClose('info')}
                  >
                    Info
                  </MButton>
                  <MButton
                    variant="contained"
                    color="success"
                    onClick={() => onSnackbarClose('success')}
                  >
                    Success
                  </MButton>
                  <MButton
                    variant="contained"
                    color="warning"
                    onClick={() => onSnackbarClose('warning')}
                  >
                    Warning
                  </MButton>
                  <MButton
                    variant="contained"
                    color="error"
                    onClick={() => onSnackbarClose('error')}
                  >
                    Error
                  </MButton>
                </Block>
              </Grid>

              <Grid item xs={12} md={6}>
                <Block title="With Action">
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => onSnackbarAction('default')}
                  >
                    Default
                  </Button>
                  <MButton
                    variant="contained"
                    color="info"
                    onClick={() => onSnackbarAction('info')}
                  >
                    Info
                  </MButton>
                  <MButton
                    variant="contained"
                    color="success"
                    onClick={() => onSnackbarAction('success')}
                  >
                    Success
                  </MButton>
                  <MButton
                    variant="contained"
                    color="warning"
                    onClick={() => onSnackbarAction('warning')}
                  >
                    Warning
                  </MButton>
                  <MButton
                    variant="contained"
                    color="error"
                    onClick={() => onSnackbarAction('error')}
                  >
                    Error
                  </MButton>
                </Block>
              </Grid>

              <Grid item xs={12} md={6}>
                <Block title="anchorOrigin">
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() =>
                      onSnackbarAction('default', {
                        vertical: 'top',
                        horizontal: 'left'
                      })
                    }
                  >
                    Top Left
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() =>
                      onSnackbarAction('default', {
                        vertical: 'top',
                        horizontal: 'center'
                      })
                    }
                  >
                    Top Center
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => onSnackbarAction('default')}
                  >
                    Top Right
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() =>
                      onSnackbarAction('default', {
                        vertical: 'bottom',
                        horizontal: 'left'
                      })
                    }
                  >
                    Bottom Left
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() =>
                      onSnackbarAction('default', {
                        vertical: 'bottom',
                        horizontal: 'center'
                      })
                    }
                  >
                    Bottom Center
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() =>
                      onSnackbarAction('default', {
                        vertical: 'bottom',
                        horizontal: 'right'
                      })
                    }
                  >
                    Bottom Right
                  </Button>
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
