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
import SubCategoriesList from './SubCategoriesList';


export default function SubCategories() {


  return (
    <Page title='Subcategoria: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Subcategoria'
          links={[
            { name: 'Subcategorias' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.products.subcategories.newSubcategory}
              startIcon={<Icon icon={plusFill} />}
            >
              Nueva Subcategoria
            </Button>
          }
        />

        <SubCategoriesList />

      </Container>
    </Page>
  );
}
