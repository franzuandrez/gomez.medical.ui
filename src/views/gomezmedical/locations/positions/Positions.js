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
import PositionsList from './PositionsList';


export default function Positions() {


  return (
    <Page title='Posicion: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Posicion'
          links={[
            { name: 'Posiciones' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.locations.positions.newPosition}
              startIcon={<Icon icon={plusFill} />}
            >
              Nueva Posicion
            </Button>
          }
        />

        <PositionsList />

      </Container>
    </Page>
  );
}
