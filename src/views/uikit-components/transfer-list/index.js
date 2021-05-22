// material
import { Card, Container, CardHeader, CardContent } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Block from '../../../components/Block';
import HeaderDashboard from '../../../components/HeaderDashboard';
//
import SimpleTransferList from './SimpleTransferList';
import EnhancedTransferList from './EnhancedTransferList';

// ----------------------------------------------------------------------

export default function TransferListComponent() {
  return (
    <Page title="Components: Transfer List | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Transfer List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Transfer List' }
          ]}
          moreLink="https://next.material-ui.com/components/transfer-list"
        />
        <Card sx={{ mb: 3 }}>
          <CardHeader title="Simple" />
          <CardContent>
            <Block>
              <SimpleTransferList />
            </Block>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Enhanced" />
          <CardContent>
            <Block>
              <EnhancedTransferList />
            </Block>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
