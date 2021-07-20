import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import CustomersList from './CustomersList';


export default function Customers() {


  return (
    <Page title='Clientes: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Cliente'
          links={[
            { name: 'Clientes' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.people.customers.newCustomer}
              startIcon={<Icon icon={plusFill} />}
            >
              Nuevo Cliente
            </Button>
          }
        />

        <CustomersList />

      </Container>
    </Page>
  );
}
