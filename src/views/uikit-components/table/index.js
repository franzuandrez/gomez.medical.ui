// material
import { Grid, Card, Container, CardHeader } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
//
import BasicTable from './BasicTable';
import CollapsibleTable from './collapsible-table';
import SortingSelecting from './sorting-selecting';
import GroupingFixedHeader from './GroupingFixedHeader';

// ----------------------------------------------------------------------

export default function TableComponent() {
  return (
    <Page title="Components: Table | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Table"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Table' }
          ]}
          moreLink="https://next.material-ui.com/components/tables"
        />

        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Basic Table" />
              <BasicTable />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <SortingSelecting />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title="Grouping & FixedHeader" />
              <GroupingFixedHeader />
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title="Collapsible Table" />
              <CollapsibleTable />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
