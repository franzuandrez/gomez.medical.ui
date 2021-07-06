import { Card, CardContent, Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';


import AddNewSubCategoryForm from './AddNewSubCategoryForm';


export default function newSubCategory() {


  return (
    <Page title='Subcategoria: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nueva Subcategoria'
          links={[
            { name: 'Subcategorias', href: PATH_APP.products.subcategories.root },
            { name: 'Crear' }
          ]}

        />
        <Card>
          <CardContent>
            <AddNewSubCategoryForm />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
