import { useState } from 'react';
// material
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import {
  Box,
  Tab,
  Grid,
  Card,
  Tabs,
  Container,
  CardContent,
  CardHeader
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Block from '../../components/Block';
import HeaderDashboard from '../../components/HeaderDashboard';

// ----------------------------------------------------------------------

const SIMPLE_TAB = [
  { value: '1', icon: <PhoneIcon />, label: 'Item One', disabled: false },
  { value: '2', icon: <FavoriteIcon />, label: 'Item Two', disabled: false },
  { value: '3', icon: <PersonPinIcon />, label: 'Item Three', disabled: true }
];

const SCROLLABLE_TAB = [
  { value: '1', icon: <PhoneIcon />, label: 'Item 1' },
  { value: '2', icon: <FavoriteIcon />, label: 'Item 2' },
  { value: '3', icon: <PersonPinIcon />, label: 'Item 3' },
  { value: '4', icon: <PersonPinIcon />, label: 'Item 4' },
  { value: '5', icon: <PersonPinIcon />, label: 'Item 5' },
  { value: '6', icon: <PersonPinIcon />, label: 'Item 6' },
  { value: '7', icon: <PersonPinIcon />, label: 'Item 7' }
];

// ----------------------------------------------------------------------

export default function TabsComponent() {
  const [value, setValue] = useState('1');
  const [valueScrollable, setValueScrollable] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeScrollable = (event, newValue) => {
    setValueScrollable(newValue);
  };

  return (
    <Page title="Components: Tabs | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Tabs"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Tabs' }
          ]}
          moreLink="https://next.material-ui.com/components/tabs"
        />

        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Text" />
              <CardContent>
                <Block>
                  <TabContext value={value}>
                    <TabList onChange={handleChange}>
                      {SIMPLE_TAB.map((tab) => (
                        <Tab
                          key={tab.value}
                          label={tab.label}
                          value={tab.value}
                        />
                      ))}
                    </TabList>
                    <Box
                      sx={{
                        p: 2,
                        mt: 2,
                        height: 80,
                        width: '100%',
                        borderRadius: 1,
                        bgcolor: 'grey.50012'
                      }}
                    >
                      {SIMPLE_TAB.map((panel) => (
                        <TabPanel key={panel.value} value={panel.value}>
                          {panel.label}
                        </TabPanel>
                      ))}
                    </Box>
                  </TabContext>
                </Block>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title="Icon" />
              <CardContent>
                <Block>
                  <Tabs value={value} onChange={handleChange}>
                    {SIMPLE_TAB.map((tab) => (
                      <Tab key={tab.value} icon={tab.icon} value={tab.value} />
                    ))}
                  </Tabs>
                </Block>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title="Text & Icon" />
              <CardContent>
                <Block>
                  <TabContext value={value}>
                    <TabList onChange={handleChange}>
                      {SIMPLE_TAB.map((tab) => (
                        <Tab
                          key={tab.value}
                          icon={tab.icon}
                          label={tab.label}
                          value={tab.value}
                          disabled={tab.disabled}
                        />
                      ))}
                    </TabList>
                  </TabContext>
                </Block>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title="Scrollable" />
              <CardContent>
                <Block>
                  <Box
                    sx={{
                      flexGrow: 1,
                      width: '100%',
                      maxWidth: 320
                    }}
                  >
                    <Tabs
                      allowScrollButtonsMobile
                      value={valueScrollable}
                      variant="scrollable"
                      scrollButtons="auto"
                      onChange={handleChangeScrollable}
                    >
                      {SCROLLABLE_TAB.map((tab) => (
                        <Tab
                          key={tab.value}
                          label={tab.label}
                          value={tab.value}
                        />
                      ))}
                    </Tabs>
                  </Box>
                </Block>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
