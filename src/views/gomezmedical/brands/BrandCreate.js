import { Container } from '@material-ui/core';
import { PATH_APP } from '../../../routes/paths';
import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
import BrandGeneralForm from './BrandGeneralForm';


export default function BrandCreate() {


  return (
    <Page title='Marca: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nueva  Marca'
          links={[
            { name: 'Marcas', href: PATH_APP.brands.root },
            { name: 'Crear' }
          ]}

        />

        <BrandGeneralForm brand={null}

        />

      </Container>
    </Page>
  );
}
