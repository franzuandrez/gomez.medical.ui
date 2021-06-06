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
import CorridorsList from './CorridorsList';


export default function Corridors() {


  return (
    <Page title='Pasillo: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Pasillo'
          links={[
            { name: 'Pasillos' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.locations.corridors.newCorridor}
              startIcon={<Icon icon={plusFill} />}
            >
              Nuevo Pasillo
            </Button>
          }
        />

        <CorridorsList />

      </Container>
    </Page>
  );
}
