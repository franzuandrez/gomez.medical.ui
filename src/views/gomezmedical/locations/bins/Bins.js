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
import BinsList from './BinsList';


export default function Bins() {


  return (
    <Page title='Bin: Listar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Bin'
          links={[
            { name: 'Bines' }
          ]}
          action={
            <Button
              variant='contained'
              component={RouterLink}
              to={PATH_APP.locations.bins.newBin}
              startIcon={<Icon icon={plusFill} />}
            >
              Nuevo Bin
            </Button>
          }
        />

        <BinsList />

      </Container>
    </Page>
  );
}
