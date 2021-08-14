import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import {
  Box,
  Grid,
  Card,
  Button,
  Typography,
  CardContent, CardHeader, LinearProgress, Divider
} from '@material-ui/core';
//

import { addCustomer, getAddresses, getCustomer, hasNoCustomer } from '../../../../redux/slices/customer';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import SalesCheckoutSummary from './SalesCheckoutSummary';
import apiCustomers from '../../../../services/api/people/apiCustomers';
import SalesSearchBar from './SalesSearchBar';
import SalesAddCustomer from './SalesAddCustomer';


AddressItem.propTypes = {
  address: PropTypes.object,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func
};

function AddressItem({ item, onNextStep, onCreateBilling }) {
  const { address, address_type } = item;

  const handleCreateBilling = () => {
    onCreateBilling(item);
    onNextStep();
  };

  return (
    <Card sx={{ position: 'relative', mb: 3 }}>
      <CardContent>
        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            &nbsp;{address_type.name}
          </Typography>
        </Box>
        <Typography variant='body2' gutterBottom>
          {`${address.city}`}
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {`${address.address_line_1} ${address.address_line_2 ?? ''}`}
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
  const [customers, setCustomers] = useState([]);

  const [openNewCustomerForm, setOpenNewCustomerForm] = useState(false);
  const { customer, addresses, existsCustomer } = useSelector((state) => state.customer);


  const { isFetching } = useQuery(
    ['customers', searchQuery],
    async () => {
      const result = await apiCustomers.getAll(`page=1&query=${searchQuery}`);
      const customers = result.data;

      if (customers.length === 0) {
        dispatch(hasNoCustomer(false));
        setOpenNewCustomerForm(true);
      } else if (customers.length === 1) {
        handleAddCustomer(customers[0]);
        setSearchQuery('');
        setOpenNewCustomerForm(false);
      } else {
        setCustomers(customers);
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
    setSearchQuery(event.target.value);
  };

  const handleCloseNewCustomerForm = () => {
    setOpenNewCustomerForm(false);
  };
  const handleOpenNewCustomerForm = () => {
    setOpenNewCustomerForm(true);
  };
  return (
    <Box {...other}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardHeader
              subheader='Buscar Cliente'
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <SalesSearchBar
                    filterName={searchQuery}
                    onFilterName={handleChangeSearchQuery}
                  />
                  {isFetching &&
                  <LinearProgress />
                  }
                </Grid>
                <Grid item xs={12} md={8}>
                  {
                    (existsCustomer && addresses.length > 0) ?
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
                          onClose={handleCloseNewCustomerForm}
                          onOPen={handleOpenNewCustomerForm}
                          open={Boolean(openNewCustomerForm)}
                        />
                      )
                  }
                </Grid>
              </Grid>
            </CardContent>
          </Card>

        </Grid>
        <Grid item xs={12} md={8}>
          {addresses && addresses.map((address, index) => (
            <AddressItem
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

          </Box>
        </Grid>

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
}
