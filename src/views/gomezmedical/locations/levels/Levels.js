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
import LevelsList from './LevelsList';


export default function Levels() {


  return (
    <Page title='Nivel: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nivel'
          links={[
            { name: 'Niveles' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.locations.levels.newLevel}
              startIcon={<Icon icon={plusFill} />}
            >
              Nuevo Rack
            </Button>
          }
        />

        <LevelsList />

      </Container>
    </Page>
  );
}
