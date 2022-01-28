import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { PATH_APP } from '../../../routes/paths';


import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
import BrandGeneralForm from './BrandGeneralForm';
import apiBrand from '../../../services/api/brand/apiBrand';


export default function BrandEdit() {


  const { id } = useParams();

  const { data: brand } = useQuery(['brand', id],
    () => apiBrand.getSingle(id)
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });

  if (!brand) {
    return null;
  }


  return (
    <Page title='Marca: Editar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Editar Marca'
          links={[
            { name: 'Marcas', href: PATH_APP.brands.root },
            { name: 'Editar' }
          ]}

        />

        <BrandGeneralForm brand={brand}
                          isEdit

        />

      </Container>
    </Page>
  );
}
