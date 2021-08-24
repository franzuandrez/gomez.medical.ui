import { Container } from '@material-ui/core';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';


import EmployeeGeneralForm from './EmployeeGeneralForm';


export default function CustomerCreate() {


  return (
    <Page title='Empleado: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nuevo  Empleado'
          links={[
            { name: 'Empleados', href: PATH_APP.people.employees.root },
            { name: 'Crear' }
          ]}

        />

        <EmployeeGeneralForm employee={null}
                             redirectBack
        />

      </Container>
    </Page>
  );
}
