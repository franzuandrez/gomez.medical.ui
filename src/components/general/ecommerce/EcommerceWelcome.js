import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Typography, Button, Box, Card, CardContent } from '@material-ui/core';

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
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 }
        }}
      >
        <Typography gutterBottom variant="h4" sx={{ color: 'grey.800' }}>
          Congratulations,
          <br /> Fabiana Capmany!
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'grey.800',
            pb: { xs: 3, xl: 5 }
          }}
        >
          Best seller of the month You have done 57.6% more sales today.
        </Typography>

        <Button to="#" variant="contained" component={RouterLink}>
          Go Now
        </Button>
      </CardContent>

      <Box
        component="img"
        alt="welcome"
        src="/static/illustrations/illustration_motivation.svg"
        sx={{
          p: 2,
          height: 280,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </RootStyle>
  );
}
