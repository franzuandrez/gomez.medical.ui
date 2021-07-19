import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { capitalCase } from 'change-case';

import {
  Box,
  Container,
  Tab, Tabs
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import roundBook from '@iconify/icons-ic/round-book';
import roundAccountBox from '@iconify/icons-ic/round-account-box';

import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import { PATH_APP } from '../../../../routes/paths';

import apiVendors from '../../../../services/api/people/apiVendors';
import Addresses from '../../business_entity/Addresses';
import VendorProductsList from './VendorProductsList';
import VendorGeneralInfo from './VendorGeneralForm';


export default function EditVendorForm() {

  const { vendorId } = useParams();
  const [currentTab, setCurrentTab] = useState('general');


  const { data: vendor } = useQuery(['vendor', vendorId],
    async () => {
      const data = await apiVendors.getSingle(vendorId);

      return data;
    }
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });

  if (!vendor) {
    return null;
  }

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <VendorGeneralInfo vendor={vendor} isEdit />
    },

    {
      value: 'direccion',
      icon: <Icon icon={roundBook} width={20} height={20} />,
      component: <Addresses businessEntity={vendor.business_entity} />
    }
    ,
    {
      value: 'productos',
      icon: <Icon icon={roundBook} width={20} height={20} />,
      component: <VendorProductsList products={vendor.products}
      vendor_id={vendor.vendor_id}
      />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  return (

    <Page title='Proveedor: Editar | Gomez-Medical'>
      <Container>

        <HeaderDashboard
          heading='Editar  Proveedor'
          links={[
            { name: 'Proveedores', href: PATH_APP.people.vendors.root },
            { name: 'Editar' }
          ]}

        />

        <Tabs
          value={currentTab}
          scrollButtons='auto'
          variant='scrollable'
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


};
