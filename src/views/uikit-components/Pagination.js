import { useState } from 'react';
// material
import {
  Card,
  Grid,
  Container,
  CardHeader,
  Pagination,
  CardContent,
  TablePagination
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Block from '../../components/Block';
import HeaderDashboard from '../../components/HeaderDashboard';

// ----------------------------------------------------------------------

export default function PaginationComponent() {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Page title="Components: Pagination | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Pagination"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Pagination' }
          ]}
          moreLink="https://next.material-ui.com/components/pagination"
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Basic" />
              <CardContent>
                <Block>
                  <Pagination count={10} />
                  <Pagination count={10} color="primary" />
                  <Pagination count={10} disabled />
                </Block>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Outlined" />
              <CardContent>
                <Block>
                  <Pagination count={10} variant="outlined" />
                  <Pagination count={10} variant="outlined" color="primary" />
                  <Pagination count={10} variant="outlined" disabled />
                </Block>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Rounded" />
              <CardContent>
                <Block>
                  <Pagination count={10} shape="rounded" />
                  <Pagination count={10} variant="outlined" shape="rounded" />
                  <Pagination count={10} shape="rounded" color="primary" />
                  <Pagination
                    count={10}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                  />
                </Block>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Size" />
              <CardContent>
                <Block>
                  <Pagination count={10} size="small" />
                  <Pagination count={10} />
                  <Pagination count={10} size="large" />
                </Block>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Buttons" />
              <CardContent>
                <Card>
                  <Block>
                    <Pagination count={10} showFirstButton showLastButton />
                    <Pagination count={10} hidePrevButton hideNextButton />
                  </Block>
                </Card>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Ranges" />
              <CardContent>
                <Block>
                  <Pagination count={11} defaultPage={6} siblingCount={0} />
                  <Pagination count={11} defaultPage={6} />
                  <Pagination
                    count={11}
                    defaultPage={6}
                    siblingCount={0}
                    boundaryCount={2}
                  />
                  <Pagination count={11} defaultPage={6} boundaryCount={2} />
                </Block>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Table" />
              <CardContent>
                <Block>
                  <TablePagination
                    component="div"
                    count={100}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Block>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
