import faker from 'faker';
// material
import { Card, Container, CardHeader, CardContent } from '@material-ui/core';
// components
import Page from '../../../components/Page';
import { PATH_DASHBOARD } from '../../../routes/paths';
import HeaderDashboard from '../../../components/HeaderDashboard';
//
import Simple from './Simple';
import Controlled from './Controlled';

// ----------------------------------------------------------------------

const ACCORDIONS = [...Array(4)].map((_, index) => {
  const setIndex = index + 1;
  return {
    value: `panel${setIndex}`,
    heading: `Accordion${setIndex}`,
    subHeading: faker.lorem.slug(),
    detail: faker.lorem.lines()
  };
});

// ----------------------------------------------------------------------

export default function AccordionComponent() {
  return (
    <Page title="Components: Accordion | Minimal-UI">
      <Container>
        <HeaderDashboard
          heading="Accordion"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Accordion' }
          ]}
          moreLink="https://next.material-ui.com/components/accordion"
        />
        <Card sx={{ mb: 3 }}>
          <CardHeader title="Simple" />
          <CardContent>
            <Simple accordions={ACCORDIONS} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Controlled" />
          <CardContent>
            <Controlled accordions={ACCORDIONS} />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
