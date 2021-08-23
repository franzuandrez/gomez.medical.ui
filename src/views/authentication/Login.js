import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Hidden,
  Tooltip,
  Container,
  Typography
} from '@material-ui/core';

// hooks
import useAuth from '../../hooks/useAuth';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import { LoginForm } from '../../components/authentication/login';
import AuthWithSocial from '../../components/authentication/AuthWithSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7)
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuth();

  return (
    <RootStyle title="Login | Gomez Medical">
      <HeaderStyle>
        <RouterLink to="/">
          <Logo />
        </RouterLink>

      </HeaderStyle>

      <Hidden mdDown>
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 15, mb: 15 }}>
            Hola, Bienvenido
          </Typography>
          <img src="/static/illustrations/illustration_login.svg" alt="login" />
        </SectionStyle>
      </Hidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
               Iniciar Sesión
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
               Introduce tus credenciales
              </Typography>
            </Box>
            <Tooltip title={method === 'firebase' ? 'Firebase' : 'JWT'}>
              <Box
                component="img"
                src={`/static/icons/${
                  method === 'firebase' ? 'ic_firebase' : 'ic_jwt'
                }.png`}
                sx={{ width: 32, height: 32 }}
              />
            </Tooltip>
          </Box>

          {method === 'firebase' && <AuthWithSocial />}



          <LoginForm />


        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
