import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { useQuery } from 'react-query';

import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import CustomerGeneralForm from './CustomerGeneralForm';
import apiCustomer from '../../../../services/api/people/apiCustomers';


export default function CustomerEdit() {


  const { customerId } = useParams();

  const { data: customer } = useQuery(['customer', customerId],
    async () => {
      const data = await apiCustomer.getSingle(customerId);

      return data;
    }
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });

  if (!customer) {
    return null;
  }

  return (
    <Page title='Cliente: Editar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Editar  Cliente'
          links={[
            { name: 'Cientes', href: PATH_APP.people.customers.root },
            { name: 'Editar' }
          ]}

        />

        <CustomerGeneralForm customer={customer} isEdit

        />

      </Container>
    </Page>
  );
}
