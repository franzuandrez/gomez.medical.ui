import { motion } from 'framer-motion';
import {Link as RouterLink, useHistory} from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Button, Typography, Container } from '@material-ui/core';
// components
import {useSnackbar} from "notistack";
import { MotionContainer, varBounceIn } from '../components/animate';
import Logo from '../components/Logo';
import Page from '../components/Page';
import useAuth from "../hooks/useAuth";
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(5, 5, 0) }
}));

// ----------------------------------------------------------------------

export default function Page403() {

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { user,logout } = useAuth();
  const handleLogout = async () => {
    try {
        await logout();

        history.push('/');


    } catch (error) {

      enqueueSnackbar('Ha ocurrido un problema al cerrar sesión', { variant: 'error' });
    }
  };

  return (
    <RootStyle title="403 No autorizado | Gomez Medical">
      <HeaderStyle>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </HeaderStyle>

      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" gutterBottom>
                ¡Lo sentimos, no tiene los permisos para ver este recurso!
              </Typography>
            </motion.div>


            <Box
              component={motion.img}
              variants={varBounceIn}
              alt="403"
              src="/static/illustrations/illustration_401.svg"
              sx={{ width: '100%', maxHeight: 240, my: { xs: 5, sm: 10 } }}
            />

            <Button
              to="/"
              size="large"
              variant="contained"
              color='inherit'
              component={RouterLink}
            >
             Ir al inicio
            </Button>
              {!!user &&
                  <Button
                      to="/"
                      size="large"
                      variant="contained"
                      onClick={handleLogout}
                  >
                      Cerrar sesión
                  </Button>
              }
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
