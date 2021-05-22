import PropTypes from 'prop-types';
// material
import { useTheme } from '@material-ui/core/styles';
import {
  Card,
  Paper,
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

ShadowCard.propTypes = {
  sx: PropTypes.object,
  title: PropTypes.string
};

function ShadowCard({ sx, title }) {
  return (
    <Paper
      sx={{
        padding: 3,
        margin: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: {
          xs: 'calc((100%/2) - 24px)',
          sm: 'calc((100%/4) - 24px)',
          md: 'calc((100%/6) - 24px)'
        },
        ...sx
      }}
    >
      <Typography variant="subtitle1">{title}</Typography>
    </Paper>
  );
}

export default function FoundationShadows() {
  const theme = useTheme();
  const systemShadows = theme.shadows.slice(1, theme.shadows.length);
  const customShadows = Object.entries(theme.customShadows).slice(
    0,
    Object.entries(theme.customShadows).length - 6
  );

  const colorShadows = [
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error'
  ];

  return (
    <Page title="Foundations: Shadows | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Shadows"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Foundations', href: PATH_DASHBOARD.foundations.root },
            { name: 'Shadows' }
          ]}
        />
        <Card sx={{ mb: 5 }}>
          <CardHeader title="System" />
          <CardContent>
            <Block sx={{ py: 5 }}>
              {systemShadows.map((shadow, index) => (
                <ShadowCard
                  key={shadow}
                  title={`z${index + 1}`}
                  sx={{ boxShadow: shadow }}
                />
              ))}
            </Block>
          </CardContent>
        </Card>

        <Card sx={{ mb: 5 }}>
          <CardHeader title="Customs" />
          <CardContent>
            <Block>
              {customShadows.map((shadow) => (
                <ShadowCard
                  key={shadow}
                  title={shadow[0]}
                  sx={{ boxShadow: shadow[1] }}
                />
              ))}
            </Block>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Colors" />
          <CardContent>
            <Block>
              {colorShadows.map((color) => (
                <ShadowCard
                  key={color}
                  title={color}
                  sx={{
                    color: theme.palette[color].contrastText,
                    bgcolor: theme.palette[color].main,
                    boxShadow: theme.customShadows[color]
                  }}
                />
              ))}
            </Block>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
