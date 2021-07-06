import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';

// material
import { Button, Container } from '@material-ui/core';

// redux
// routes
import { PATH_APP } from '../../../../routes/paths';
// components
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import CategoriesList from './CategoriesList';


export default function Categories() {


  return (
    <Page title='Categoria: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Categoria'
          links={[
            { name: 'Categorias' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.products.categories.newCategory}
              startIcon={<Icon icon={plusFill} />}
            >
              Nueva Categoria
            </Button>
          }
        />

        <CategoriesList />

      </Container>
    </Page>
  );
}
