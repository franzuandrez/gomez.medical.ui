import { useQuery } from 'react-query';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container, Grid, LinearProgress,
  Link, Typography
} from '@material-ui/core';
import { PATH_APP } from '../../../routes/paths';
import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
import apiControlCashRegister from '../../../services/api/cash_register/apiControlCashRegister';
import Label from '../../../components/Label';
import ControlCashRegisterEndedDetailList from './ControlCashRegisterEndedDetailList';
import ControlCashRegisterStartedDetailList from './ControlCashRegisterStartedDetailList';


export default function ControlCashRegisterStart() {


  const { controlCashRegisterId } = useParams();

  const {
    data: controlCashRegister,
    isLoading
  } = useQuery(['control_cash_register_show', controlCashRegisterId], () => apiControlCashRegister.getSingle(controlCashRegisterId)
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });


  return (
    <Page title='Control Caja: Ver | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Iniciar Control de caja'
          links={[
            { name: 'Listado', href: PATH_APP.cash_register_control.controls.root },
            { name: 'Ver' }
          ]}

        />
        {!isLoading &&
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'left' } }}>
              <Typography
                paragraph
                variant='overline'
                sx={{ color: 'text.disabled' }}
              >
                General
              </Typography>
              <Typography variant='body2'>
                Vendedor: {controlCashRegister.control.sales_person.person.first_name} {controlCashRegister.control.sales_person.person.last_name}
              </Typography>
              <Typography variant='body2'>
                Turno: {controlCashRegister.control.shift.name}
              </Typography>

            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                color={controlCashRegister.control.status === 'finalizado' ? 'success' : 'warning'}
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {controlCashRegister.control.status}
              </Label>
              <Typography
                variant='h6'>Caja: {controlCashRegister.control.cash_register.cash_register_number}</Typography>

            </Box>

          </Grid>

        </Grid>
        }
        {isLoading && <LinearProgress />}
        {(controlCashRegister && controlCashRegister.control.status === 'finalizado') &&
        <ControlCashRegisterEndedDetailList detail={controlCashRegister.detail} />}
        {(controlCashRegister && controlCashRegister.control.status === 'iniciado') &&
        <ControlCashRegisterStartedDetailList detail={controlCashRegister.detail} />}

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>


          <Link
            component={RouterLink}
            to={`${PATH_APP.cash_register_control.controls.root}`}>
            <Button
              type='button'
              color='inherit'
              variant='outlined'
              sx={{ mr: 1.5 }}
            >
              Regresar
            </Button>
          </Link>

        </Box>
      </Container>
    </Page>
  )
    ;
}
