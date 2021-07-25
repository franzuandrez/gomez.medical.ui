import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';


import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import ShipMethodGeneralForm from './ShipMethodGeneralForm';
import apiShipMethod from '../../../../services/api/purchasing/apiShipMethods';


export default function ShipMethodEdit() {


  const { shipMethodId } = useParams();

  const { data: shipMethod } = useQuery(['ship_method', shipMethodId],
    async () => {
      const data = await apiShipMethod.getSingle(shipMethodId);

      return data;
    }
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });

  if (!shipMethod) {
    return null;
  }


  return (
    <Page title='Método de envío: Editar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Editar  Método de envío'
          links={[
            { name: 'Métodos de envío', href: PATH_APP.purchasing.ship_methods.root },
            { name: 'Editar' }
          ]}

        />

        <ShipMethodGeneralForm ship_method={shipMethod}
                               isEdit

        />

      </Container>
    </Page>
  );
}
