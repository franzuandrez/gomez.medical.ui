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
import RacksList from './RacksList';


export default function Racks() {


  return (
    <Page title='Rack: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Rack'
          links={[
            { name: 'Racks' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.locations.racks.newRack}
              startIcon={<Icon icon={plusFill} />}
            >
              Nuevo Rack
            </Button>
          }
        />

        <RacksList />

      </Container>
    </Page>
  );
}
