import { useState } from 'react';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import { DesktopDatePicker, LoadingButton } from '@material-ui/lab';
import {
  Box, CircularProgress, Divider, FormControlLabel, Grid, Switch, TextField,
  Typography
} from '@material-ui/core';
import { experimentalStyled as styled, makeStyles } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import { green } from '@material-ui/core/colors';
import roundAddShoppingCart from '@iconify/icons-ic/add';
import apiInventory from '../../../services/api/inventory/apiInventory';
import apiBins from '../../../services/api/locations/apiBins';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

InventoryAddForm.propTypes = {
  product: PropTypes.object
};


export default function InventoryAddForm({ product }) {


  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [useBatch, setUseBatch] = useState(false);
  const [useExpirationDate, setUseExpirationDate] = useState(false);
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [location, setLocation] = useState(null);

  const InventorySchema = Yup.object().shape({
    product_id: Yup.string().required('Producto requerido'),
    location_id: Yup.string().required('Ubicacion requerida'),
    best_before: Yup.string().required('Fecha de venciemiento  requerida'),
    batch: Yup.string().required('Lote  requerido'),
    quantity: Yup.number().required('Cantidad  requerida')

  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      product_id: product?.product_id || '',
      location_id: location?.bin_id || '',
      location_name: location?.name || '',
      quantity: '',
      batch: '',
      best_before: expirationDate
    },
    validationSchema: InventorySchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {

        setSubmitting(true);
        const result = await apiInventory.post(values);

        if (result.status) {
          enqueueSnackbar('No ha sido posible dar de alta el inventario', { variant: 'error' });
        } else {
          enqueueSnackbar('Ingreado correctamente', { variant: 'success' });
        }
        setLocation(null);
        setUseBatch(false);
        setUseExpirationDate(false);
        setSubmitting(false);
        setLocation(null);
        resetForm();
        setExpirationDate(new Date());
      } catch (error) {
        setSubmitting(false);
        setErrors({ afterSubmit: error.message });
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  });
  const {
    errors,
    touched,
    values,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;

  const handleChangeLocation = async (event) => {
    try {
      const { value } = event ? event.target : '';
      setFieldValue('location_name', value);
      if (value) {
        setIsLoadingLocation(true);
        setLocation(null);
        const response = await apiBins.getAll(`page=1&query=${value}&perPage=1`);
        const bins = response.data;

        if (bins.length > 0) {
          setLocation(bins[0]);
        }
        setIsLoadingLocation(false);
      } else {
        setLocation(null);
        setIsLoadingLocation(false);

      }
    } catch (error) {
      setLocation(null);
      setIsLoadingLocation(false);
    }

  };
  return (

    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <RootStyle>
          <Typography variant='h4'>
            {product?.name}
          </Typography>
          <Box
            sx={{
              my: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant='subtitle1' sx={{ mt: 0.5 }}>
              Color
            </Typography>
            <Typography variant='h5' paragraph>
              {product?.color}
            </Typography>
          </Box>
          <Box
            sx={{
              my: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant='subtitle1' sx={{ mt: 0.5 }}>
              Tamaño
            </Typography>
            <Typography variant='h5' paragraph>
              {product?.size}
            </Typography>
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box
            sx={{
              my: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <TextField
              variant='outlined'
              label='Ubicación'
              color='primary'
              fullWidth
              helperText={location ? 'Correcta' : 'No encontrado '}
              sx={{ mb: 3 }}
              error={!location}
              value={values.location_name}
              onChange={handleChangeLocation}
            />
            <div className={classes.wrapper}>
              {isLoadingLocation && <CircularProgress size={68} className={classes.fabProgress} />}
            </div>

          </Box>

          <Box
            sx={{
              my: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <FormControlLabel
              control={<Switch checked={useBatch} />}
              onChange={() => {
                setUseBatch(!useBatch);
                setFieldValue('batch', '');
                if (useBatch) {
                  setFieldValue('batch', 'NA');
                }
              }}
              label='Lote'
              sx={{ mb: 2 }}
            />
            <TextField
              variant='outlined'
              color='primary'
              fullWidth
              disabled={!useBatch}
              sx={{ mb: 3 }}
              value={values.batch}
              {...getFieldProps('batch')}
              error={Boolean(touched.batch && errors.batch && useBatch)}
              helperText={(touched.batch && errors.batch && useBatch) ? (touched.batch && errors.batch) : ''}
            />
          </Box>
          <Box
            sx={{
              my: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <FormControlLabel
              control={<Switch checked={useExpirationDate} />}
              onChange={() => {
                setUseExpirationDate(!useExpirationDate);
              }}
              label='Vence'
              sx={{ mb: 2 }}
            />

            <DesktopDatePicker
              error={Boolean(touched.best_before && errors.best_before && useExpirationDate)}
              value={expirationDate}
              disabled={!useExpirationDate}
              minDate={new Date()}
              onChange={(newValue) => {
                if (newValue) {
                  setFieldValue('best_before', newValue);
                }


              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin='normal' />
              )}
            />
          </Box>
          <Box
            sx={{
              my: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <TextField
              variant='outlined'
              label='Cantidad'
              color='primary'
              fullWidth
              sx={{ mb: 3 }}
              value={values.quantity}
              {...getFieldProps('quantity')}
              error={Boolean(touched.quantity && errors.quantity)}
              helperText={touched.quantity && errors.quantity}
            />
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <LoadingButton
                  fullWidth
                  size='large'
                  type='submit'
                  pending={isSubmitting}
                  color='primary'
                  variant='contained'
                  startIcon={<Icon icon={roundAddShoppingCart} />}
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Agregar
                </LoadingButton>
              </Grid>

            </Grid>

          </Box>
        </RootStyle>
      </Form>
    </FormikProvider>

  )
    ;
}
