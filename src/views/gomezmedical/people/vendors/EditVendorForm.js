import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { capitalCase } from 'change-case';
import { useSnackbar } from 'notistack';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Container,
  Tab, Tabs
} from '@material-ui/core';
import { Icon } from '@iconify/react';
import roundBook from '@iconify/icons-ic/round-book';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import ecommerce from '@iconify/icons-ic/add-shopping-cart';
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
  const { enqueueSnackbar } = useSnackbar();

  const { data: vendor } = useQuery(['vendor', vendorId],
    async () => apiVendors.getSingle(vendorId)
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });
  const VendorSchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: vendor?.name || '',
      url_web: vendor?.url_web || ''
    },
    validationSchema: VendorSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setSubmitting(true);
        await apiVendors.patch(values, vendor.vendor_id);
        enqueueSnackbar('Creado correctamente', { variant: 'success' });

        resetForm();
        setSubmitting(false);


      } catch (error) {
        setSubmitting(false);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  });

  if (!vendor) {
    return null;
  }


  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <VendorGeneralInfo vendor={vendor} isEdit formik={formik} />,
      disabled: !vendor
    },

    {
      value: 'direccion',
      icon: <Icon icon={roundBook} width={20} height={20} />,
      component: <Addresses businessEntity={vendor.business_entity} />,
      disabled: !vendor
    }
    ,
    {
      value: 'productos',
      icon: <Icon icon={ecommerce} width={20} height={20} />,
      component: <VendorProductsList products={vendor?.products}
                                     vendor_id={vendor?.vendor_id}
      />,
      disabled: !vendor
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
              disabled ={tab.disabled}
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
