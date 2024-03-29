import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import { PATH_APP } from '../../../routes/paths';
import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
import BrandList from './BrandList';


export default function Brands() {


  return (
    <Page title='Marcas: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Marca'
          links={[
            { name: 'Marcas' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.brands.newBrand}
              startIcon={<Icon icon={plusFill} />}
            >
              Nueva Marca
            </Button>
          }
        />

        <BrandList />

      </Container>
    </Page>
  );
}
