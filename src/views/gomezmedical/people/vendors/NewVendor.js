import * as Yup from 'yup';
import { useFormik } from 'formik';
import { capitalCase } from 'change-case';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Box, Container, Tab, Tabs } from '@material-ui/core';
import { Icon } from '@iconify/react';
import roundBook from '@iconify/icons-ic/round-book';
import ecommerce from '@iconify/icons-ic/add-shopping-cart';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import bank from '@iconify/icons-ic/account-balance';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import VendorGeneralInfo from './VendorGeneralForm';
import Addresses from '../../business_entity/Addresses';
import VendorProductsList from './VendorProductsList';
import BankAccounts from '../../business_entity/BankAccounts';
import apiVendors from '../../../../services/api/people/apiVendors';


export default function NewVendor() {

  const [currentTab, setCurrentTab] = useState('general');
  const { enqueueSnackbar } = useSnackbar();
  const [vendorSaved, setVendorSaved] = useState(null);
  const VendorSchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido')
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: vendorSaved?.name || '',
      url_web: vendorSaved?.url_web || ''
    },
    validationSchema: VendorSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setSubmitting(true);
        const result = await apiVendors.post(values);
        enqueueSnackbar('Creado correctamente', { variant: 'success' });
        setVendorSaved(result);
        resetForm();
        setSubmitting(false);

      } catch (error) {
        setSubmitting(false);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  });

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };


  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <VendorGeneralInfo vendor={vendorSaved} formik={formik} />,
      disabled: false
    },
    {
      value: 'banco',
      icon: <Icon icon={bank} width={20} height={20} />,
      component: <BankAccounts businessEntity={vendorSaved?.business_entity}
      />,
      disabled: !vendorSaved
    },
    {
      value: 'direccion',
      icon: <Icon icon={roundBook} width={20} height={20} />,
      component: <Addresses businessEntity={vendorSaved?.business_entity} />,
      disabled: !vendorSaved
    }
    ,
    {
      value: 'productos',
      icon: <Icon icon={ecommerce} width={20} height={20} />,
      component: <VendorProductsList products={vendorSaved?.products}
                                     vendor_id={vendorSaved?.vendor_id}
      />,
      disabled:!vendorSaved
    }
  ];

  return (
    <Page title='Proveedor: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nuevo  Proveedor'
          links={[
            { name: 'Proveedores', href: PATH_APP.people.vendors.root },
            { name: 'Crear' }
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
              disabled={tab.disabled}
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
