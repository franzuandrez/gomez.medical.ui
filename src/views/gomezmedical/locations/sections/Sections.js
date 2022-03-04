import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';

// material
import { Button, Container } from '@material-ui/core';
import { checkPermission } from '../../../../utils/checkPermission';
// redux
// routes
import { PATH_APP } from '../../../../routes/paths';
// components
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import SectionsList from './SectionsList';


export default function Sections() {

  const { user } = useSelector((state) => state.authJwt);
  const { permissions } = user;

  return (
    <Page title='Sector: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Sector'
          links={[
            { name: 'Sectores' }
          ]}
          action={
            checkPermission('create section', permissions) &&
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.locations.sections.newSection}
              startIcon={<Icon icon={plusFill} />}
            >
              Nuevo Sector
            </Button>
          }
        />

        <SectionsList />

      </Container>
    </Page>
  );
}
