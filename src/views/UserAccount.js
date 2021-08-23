import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState } from 'react';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// material
import { Container, Tab, Box, Tabs } from '@material-ui/core';
import { PATH_DASHBOARD } from '../routes/paths';
// components
import Page from '../components/Page';
import HeaderDashboard from '../components/HeaderDashboard';
import {
  AccountGeneral,
  AccountChangePassword
} from '../components/user/account';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const [currentTab, setCurrentTab] = useState('general');



  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <AccountGeneral />
    },
    {
      value: 'cambiar_clave',
      icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <AccountChangePassword />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Page title="Usuario: Configuraciones | Gomez Medical">
      <Container>
        <HeaderDashboard
          heading="Cuenta"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Configuraciones' }
          ]}
        />

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={handleChangeTab}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
