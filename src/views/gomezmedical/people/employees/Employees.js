import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import EmployeesList from './EmployeesList';


export default function Employees() {

  return (
    <Page title='Empleados: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Empleado'
          links={[
            { name: 'Empleados' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.people.employees.newEmployee}
              startIcon={<Icon icon={plusFill} />}
            >
              Nuevo Empleado
            </Button>
          }
        />

        <EmployeesList />

      </Container>
    </Page>
  );
}
