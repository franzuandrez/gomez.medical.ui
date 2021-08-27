import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Typography, Box, Card, CardContent } from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  [theme.breakpoints.up('xl')]: { height: 320 }
}));

// ----------------------------------------------------------------------

export default function EcommerceWelcome() {

  const { user } = useAuth();

  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 }
        }}
      >
        <Typography gutterBottom variant='h4' sx={{ color: 'grey.800' }}>
          {user.employee.gender === 'M' ? 'Bienvenido' : 'Bienvenida'},
          <br />  {user.employee.business_entity.person.first_name} {user.employee.business_entity.person.last_name}
        </Typography>




      </CardContent>

      <Box
        component='img'
        alt='welcome'
        src='/static/illustrations/illustration_motivation.svg'
        sx={{
          p: 2,
          height: 280,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </RootStyle>
  );
}
