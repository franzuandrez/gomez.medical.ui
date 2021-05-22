// material
import { Card, Container, CardContent } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import CopyClipboard from '../../components/CopyClipboard';
import HeaderDashboard from '../../components/HeaderDashboard';

// ----------------------------------------------------------------------

export default function CopyToClipboard() {
  return (
    <Page title="Components: Copy To Clipboard | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Copy To Clipboard"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Copy To Clipboard' }
          ]}
          moreLink="https://www.npmjs.com/package/react-copy-to-clipboard"
        />

        <Card>
          <CardContent>
            <CopyClipboard value="https://www.npmjs.com/package/react-copy-to-clipboard" />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
