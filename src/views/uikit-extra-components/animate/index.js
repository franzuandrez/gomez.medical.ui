import { useState } from 'react';
// material
import { Box, Container, Tab } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
//
import Inview from './inview';
import OtherView from './other';
import ScrollView from './scroll';
import DialogView from './dialog';
import BackgroundView from './background';

// ----------------------------------------------------------------------

const TAB_LIST = [
  { label: 'In View', component: <Inview /> },
  { label: 'Scroll', component: <ScrollView /> },
  { label: 'Dialog', component: <DialogView /> },
  { label: 'Background', component: <BackgroundView /> },
  { label: 'Other', component: <OtherView /> }
];

export default function Animate() {
  const [value, setValue] = useState('In View');

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Components: Animate | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Animate"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Animate' }
          ]}
          moreLink="https://www.framer.com/api/motion"
        />

        <TabContext value={value}>
          <Box sx={{ mb: 5 }}>
            <TabList onChange={handleChangeTab}>
              {TAB_LIST.map((tab) => (
                <Tab
                  key={tab.label}
                  label={tab.label}
                  value={tab.label}
                  disableRipple
                />
              ))}
            </TabList>
          </Box>
          {TAB_LIST.map((tab) => (
            <TabPanel key={tab.label} value={tab.label}>
              {tab.component}
            </TabPanel>
          ))}
        </TabContext>
      </Container>
    </Page>
  );
}
