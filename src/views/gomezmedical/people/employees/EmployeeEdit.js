import { useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { useQuery } from 'react-query';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import EmployeeGeneralForm from './EmployeeGeneralForm';
import apiEmployee from '../../../../services/api/people/apiEmployee';


export default function EmployeeEdit() {


  const { employeeId } = useParams();

  const { data: employee } = useQuery(['employee', employeeId],
    async () => {
      const data = await apiEmployee.getSingle(employeeId);
      return data;
    }
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });

  if (!employee) {
    return null;
  }

  return (
    <Page title='Empleado: Editar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Editar  Empleado'
          links={[
            { name: 'Empleados', href: PATH_APP.people.employees.root },
            { name: 'Editar' }
          ]}

        />

        <EmployeeGeneralForm employee={employee} isEdit
                             redirectBack

        />

      </Container>
    </Page>
  );
}
