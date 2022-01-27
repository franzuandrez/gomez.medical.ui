import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import { PATH_APP } from '../../../routes/paths';
import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
import PaymentList from './PaymentList';


export default function Payment() {

  return (
    <Page title='Pagos: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Pago'
          links={[
            { name: 'Pagos' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.payments.payments.create}
              startIcon={<Icon icon={plusFill} />}
            >
              Nuevo Pago
            </Button>
          }
        />

        <PaymentList />

      </Container>
    </Page>
  );
}
