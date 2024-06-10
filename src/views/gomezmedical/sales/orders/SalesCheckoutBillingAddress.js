import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import useKeyboardShortcut from 'use-keyboard-shortcut';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import {
  Box,
  Grid,
  Card,
  Button,
  Typography,
  CardContent, CardHeader, LinearProgress, Divider, FormControlLabel, Switch
} from '@material-ui/core';
//

import {
  addCustomer,
  getAddresses,
  getCustomer,
  setDefaultCustomerSelected
} from '../../../../redux/slices/customer';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import SalesCheckoutSummary from './SalesCheckoutSummary';
import apiCustomers from '../../../../services/api/people/apiCustomers';
import SalesSearchBar from './SalesSearchBar';
import SalesAddCustomer from './SalesAddCustomer';
import SalesCustomerList from './SalesCustomerList';
import Label from '../../../../components/Label';
import SalesNewAddressForm from './SalesNewAddressForm';


AddressItem.propTypes = {
  item: PropTypes.object,
  customer: PropTypes.object,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func
};


function AddressItem({ item, onNextStep, onCreateBilling, customer, isSelected = false }) {
  const { address, address_type, isDefault } = item;

  const handleCreateBilling = () => {
    onCreateBilling(item);
    onNextStep();
  };
  useKeyboardShortcut(['enter'], () => isSelected && handleCreateBilling(), { overrideSystem: false });
  return (
    <Card sx={{ position: 'relative', mb: 3, border: isSelected && '2px solid #00ab55' }}>

      <CardContent>
        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
          <Typography
            variant='subtitle1'>{customer.person.first_name} {customer.person.last_name} {customer.business_name}</Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            &nbsp;({address_type.name})
          </Typography>
          {isDefault && (
            <Label color='info' sx={{ ml: 1 }}>
              Default
            </Label>
          )}
        </Box>
        <Typography variant='body2' gutterBottom>
          {address.city} {address.address_line_1}
        </Typography>


        <Box
          sx={{
            mt: 3,
            display: 'flex',
            position: { sm: 'absolute' },
            right: { sm: 24 },
            bottom: { sm: 24 }
          }}
        >
          <Box sx={{ mx: 0.5 }} />
          <Button variant='outlined' size='small' onClick={handleCreateBilling}>
            Utilizar esta dirección
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

SalesCheckoutBillingAddress.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.number,
  subtotal: PropTypes.number,
  onBackStep: PropTypes.func,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func
};

export default function SalesCheckoutBillingAddress({
                                                      total,
                                                      discount,
                                                      subtotal,
                                                      onBackStep,
                                                      onNextStep,
                                                      onCreateBilling,
                                                      ...other
                                                    }) {
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [customerQuery, setCustomerQuery] = useState('');
  const [openAddressForm, setOpenAddressForm] = useState(false);

  const [customers, setCustomers] = useState([]);
  const [currentIndexAddress, setCurrentIndexAddress] = useState(-1);

  const [openNewCustomerForm, setOpenNewCustomerForm] = useState(false);
  const [openCustomerList, setOpenCustomerList] = useState(false);
  const {
    customer,
    addresses,
    defaultCustomer,
    defaultCustomerSelected
  } = useSelector((state) => state.customer);

  const { isFetching } = useQuery(
    ['customers', searchQuery],
    async () => {
      const result = await apiCustomers.getAll(`page=1&query=${searchQuery}`);
      const customers = result.data;

      if (customers.length === 0) {

        setOpenNewCustomerForm(true);
        dispatch(addCustomer(null));
      } else if (customers.length === 1) {
        handleAddCustomer(customers[0]);
        setSearchQuery('');
        setOpenNewCustomerForm(false);
      } else {
        setCustomers(customers);
        setOpenCustomerList(true);
        setOpenNewCustomerForm(false);
      }
    },
    {
      enabled: !!searchQuery,
      keepPreviousData: true,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    }
  );


  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCustomer(customer));
    }
  }, [dispatch, isMountedRef, customer]);
  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getAddresses(addresses));
    }
  }, [dispatch, isMountedRef, addresses]);
  const handleAddCustomer = (customer) => {
    if (customer) {
      dispatch(addCustomer(customer));
    }
  };
  const handleChangeSearchQuery = (event) => {
    setCustomerQuery(event.target.value);
    if (customer && defaultCustomerSelected) {
      dispatch(setDefaultCustomerSelected(!defaultCustomerSelected));
      dispatch(addCustomer(null));
    }


  };

  const handleEnter = (event) => {
    if (event.which === 13) {
      setSearchQuery(customerQuery);
    }
  };

  const handleCloseNewCustomerForm = () => {
    setOpenNewCustomerForm(false);
  };
  const handleOpenNewCustomerForm = () => {
    setOpenNewCustomerForm(true);
  };
  const handleCloseCustomerLit = () => {
    setOpenCustomerList(false);

  };

  const handleSetDefaultCustomer = () => {

    dispatch(setDefaultCustomerSelected(!defaultCustomerSelected));
    if (!defaultCustomerSelected) {
      setCustomerQuery('');
      handleAddCustomer(defaultCustomer);
      onCreateBilling(defaultCustomer.business_entity.addresses[0])
      onNextStep()
    } else {
      dispatch(addCustomer(null));

    }

  };
  const handleMoveAcrossAddress = (moveTo = 1) => {

    const max = (addresses?.length || Infinity) - 1;
    if (currentIndexAddress - moveTo >= 0 && currentIndexAddress - moveTo <= max)
      setCurrentIndexAddress(currentIndexAddress - moveTo);
  };
  const handleClickOpenAddressForm = () => {
    setOpenAddressForm(true);
  };

  const handleCloseAddressForm = () => {
    setOpenAddressForm(false);
  };


  useKeyboardShortcut(['control', 'D'], () => handleSetDefaultCustomer(), { overrideSystem: true });
  useKeyboardShortcut(['ArrowUp'], () => handleMoveAcrossAddress(1), { overrideSystem: true });
  useKeyboardShortcut(['ArrowDown'], () => handleMoveAcrossAddress(-1), { overrideSystem: true });

  return (
    <Box {...other}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardHeader
              subheader='Cliente'
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={2}>
                  <FormControlLabel
                    onChange={() =>
                      handleSetDefaultCustomer()
                    }
                    control={
                      <Switch
                        checked={defaultCustomerSelected}
                      />
                    }
                    label='C/F'
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <SalesSearchBar
                    filterName={customerQuery}
                    onFilterName={handleChangeSearchQuery}
                    onEnter={handleEnter}
                  />
                  {isFetching &&
                  <LinearProgress />
                  }
                </Grid>

                <Grid item xs={12} md={7}>
                  {
                    (customer) ?
                      (<Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                        >
                          <Typography variant='subtitle2'>
                            <Typography
                              noWrap
                              variant='body2'
                              sx={{ maxWidth: 240, color: 'text.secondary' }}
                            >
                              Nit:&nbsp;
                            </Typography>
                            {customer.nit}
                          </Typography>
                        </Box>
                        <Divider
                          orientation='vertical'
                          sx={{ mx: 1, height: 16 }}
                        />
                        <Box
                        >
                          <Typography variant='subtitle2'>
                            <Typography
                              noWrap
                              variant='body2'
                              sx={{ color: 'text.secondary' }}
                            >
                              Nombre:&nbsp;
                            </Typography>
                            {customer.person?.first_name ?? ''} {customer.person?.last_name ?? ''} {customer.business_name ?? ''}
                          </Typography>
                        </Box>

                      </Box>) :
                      (
                        <SalesAddCustomer
                          customerQuery={customerQuery}
                          onClose={handleCloseNewCustomerForm}
                          onOPen={handleOpenNewCustomerForm}
                          open={Boolean(openNewCustomerForm)}
                        />
                      )
                  }
                </Grid>

                {customers &&
                <SalesCustomerList
                  customers={customers}
                  open={openCustomerList}
                  onSelectCustomer={handleAddCustomer}
                  onClose={handleCloseCustomerLit} />}
              </Grid>
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={12} md={8}>
          {addresses && addresses.map((address, index) => (
            <AddressItem
              customer={customer}
              isSelected={index === currentIndexAddress}
              key={index}
              item={address}
              onNextStep={onNextStep}
              onCreateBilling={onCreateBilling}
            />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              size='small'
              color='inherit'
              onClick={onBackStep}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Regresar
            </Button>
            {customer &&
            <Button
              size='small'
              onClick={handleClickOpenAddressForm}
              startIcon={<Icon icon={plusFill} />}
            >
              Agregar dirección
            </Button>
            }

          </Box>
        </Grid>
        {customer &&
        <SalesNewAddressForm customer={customer}
                             open={openAddressForm}
                             onClose={handleCloseAddressForm} />
        }

        <Grid item xs={12} md={4}>
          <SalesCheckoutSummary
            subtotal={subtotal}
            total={total}
            discount={discount}
          />
        </Grid>
      </Grid>


    </Box>
  );
};
