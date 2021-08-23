import { Link as ScrollLink } from 'react-scroll';
// material
import { Link, Container, Typography } from '@material-ui/core';
//
import Logo from '../Logo';

// ----------------------------------------------------------------------

export default function LandingFooter() {
  return (
    <Container maxWidth='lg' sx={{ textAlign: 'center', py: 5 }}>
      <ScrollLink to='move_top' spy smooth>
        <Logo sx={{ mb: 1, mx: 'auto' }} />
      </ScrollLink>

      <Typography variant='caption'>
        © Todos los derechos reservados
        <br /> Por &nbsp;
        <Link href='https://gomezmedical.com.gt'>Gomez Medical</Link>
      </Typography>
    </Container>
  );
}
