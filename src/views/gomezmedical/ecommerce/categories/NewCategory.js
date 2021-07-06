import { Card, CardContent, Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';


import AddNewCategoryForm from './AddNewCategoryForm';


export default function newCategory() {


  return (
    <Page title='Categoria: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nuevo  Categoria'
          links={[
            { name: 'Categorias', href: PATH_APP.products.categories.root },
            { name: 'Crear' }
          ]}

        />
        <Card>
          <CardContent>
            <AddNewCategoryForm />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
