import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import { PATH_APP } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
import ControlCashRegisterList from './ControlCashRegisterList';



export default function ControlCashRegister() {


  return (
    <Page title='Control Caja | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Control de Caja'
          links={[
            { name: 'Listado' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.cash_register_control.controls.startControl}
              startIcon={<Icon icon={plusFill} />}
            >
             Iniciar
            </Button>
          }
        />

        <ControlCashRegisterList/>

      </Container>
    </Page>
  );
}
