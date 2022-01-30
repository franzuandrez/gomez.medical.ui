import * as Yup from 'yup';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { add, filter, multiply } from 'lodash';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container, FormControl, FormControlLabel, FormHelperText,
  Grid,
  LinearProgress, Stack, Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Form, FormikProvider, useFormik } from 'formik';
import { Icon } from '@iconify/react';
import minusFill from '@iconify/icons-eva/minus-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { MIconButton } from '../../../../components/@material-extend';
// routes
import { fCurrency } from '../../../../utils/formatNumber';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import Scrollbar from '../../../../components/Scrollbar';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import ShipMethodSearchBox from '../ship_method/ShipMethodSearchBox';
import apiPurchase from '../../../../services/api/purchasing/apiPurchase';
import PurchaseReceiveOrderSummary from './PurchaseReceiveOrderSummary';


const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

Incrementer.propTypes = {
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func
};

function Incrementer({ quantity, onIncrease, onDecrease }) {
  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <MIconButton
          size='small'
          color='inherit'
          onClick={onDecrease}
          disabled={quantity <= 0}
        >
          <Icon icon={minusFill} width={16} height={16} />
        </MIconButton>
        {quantity}
        <MIconButton
          size='small'
          color='inherit'
          onClick={onIncrease}
        >
          <Icon icon={plusFill} width={16} height={16} />
        </MIconButton>
      </IncrementerStyle>

    </Box>
  );
}

export default function PurchaseReceiveOrder() {

  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = useState([]);
  const [subTotal, setSubtotal] = useState(0);


  const { isLoading } = useQuery(['purchase_receive', id],
    async () => {
      const data = await apiPurchase.getSingle(id);
      setProducts(data.detail);
      return data;
    }
    , {
      refetchOnWindowFocus: false
    });

  useEffect(() => {
    getTotal(products);
  }, [products]);

  const PurchaseReceiveSchema = Yup.object().shape({
    ship_method_id: Yup.number().required('Metodo de envio requerido'),
    freight: Yup.number().typeError('Introduce una cantida válida').required('Costo requerido')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ship_method_id: '',
      freight: 0,
      products,
      subTotal
    },

    validationSchema: PurchaseReceiveSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setSubmitting(true);
        await apiPurchase.put(values, id);
        enqueueSnackbar('Creado correctamente', { variant: 'success' });
        resetForm();
        setSubmitting(false);
        setProducts([]);

      } catch (error) {
        setSubmitting(false);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;


  const handleIncrease = (productId) => {

    const product = filter(products,
      (_product) => _product.product.product_id === productId
    );
    product[0].received_quantity = add(product[0].received_quantity, 1);
    setProducts([...products]);

  };


  const handleDecrease = (productId) => {

    const product = filter(products,
      (_product) => _product.product.product_id === productId
    );

    product[0].received_quantity = add(product[0].received_quantity, -1);
    setProducts([...products]);

  };
  const getSubTotal = (products) => {


    if (products.length === 0) {
      return 0;
    }
    return products.map(e => multiply(add(e.order_quantity, e.received_quantity), e.unit_price))
      .reduce((x, y) => (x + y), 0);

  };
  const getTotal = useCallback((products) => {

    const subtotal = getSubTotal(products);
    const total = add(subtotal, parseFloat(values.freight));
    setSubtotal(subtotal);
    return total;
  }, []);


  return (
    <Page title='Orden: Recepcionar | Minimal-UI'>
      <Container>
        <HeaderDashboard
          heading='Orden'
          links={[
            {
              name: 'Ordenes',
              href: PATH_APP.purchasing.orders.root
            },
            {
              name: 'Ver',
              href: `${PATH_APP.purchasing.orders.root}/${id}`
            },
            { name: 'Recepcionar' }
          ]}
        />
        {isLoading ? (<LinearProgress />) : (
          <FormikProvider value={formik}>
            <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Card>
                    <CardHeader
                      title='Recepcion del Pedido '
                    />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>

                          <ShipMethodSearchBox
                            getFieldProps={getFieldProps('ship_method_id')}
                            required
                            onChange={(event, newValue) => {
                              if (event) {
                                setFieldValue('ship_method_id', newValue.ship_method_id, true);
                              }
                            }}
                            error={Boolean(touched.ship_method_id && errors.ship_method_id)}
                            helperText={touched.ship_method_id && errors.ship_method_id}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label='Costo de envio'
                            variant='outlined'
                            color='primary'
                            fullWidth
                            sx={{ mb: 3 }}
                            required
                            value={values.freight}
                            {...getFieldProps('freight')}
                            error={Boolean(touched.freight && errors.freight)}
                            helperText={touched.freight && errors.freight}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Scrollbar>
                            <TableContainer>
                              <Table>
                                <TableHead
                                  sx={{
                                    borderBottom: (theme) =>
                                      `solid 1px ${theme.palette.divider}`,
                                    '& th': { backgroundColor: 'transparent' }
                                  }}
                                >
                                  <TableRow>
                                    <TableCell width={40}>#</TableCell>
                                    <TableCell align='left'>Descripción</TableCell>
                                    <TableCell align='left'>Cant Solicitada</TableCell>
                                    <TableCell align='left'>Cant. Entrante</TableCell>
                                    <TableCell align='left'>Precio</TableCell>
                                    <TableCell align='left'>Total</TableCell>
                                  </TableRow>
                                </TableHead>

                                <TableBody>
                                  {products.map((row, index) => (
                                    <TableRow
                                      key={index}
                                      sx={{
                                        borderBottom: (theme) =>
                                          `solid 1px ${theme.palette.divider}`
                                      }}
                                    >
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell align='left'>
                                        <Box sx={{ maxWidth: 300 }}>
                                          <Typography variant='subtitle2'>
                                            {row.product.name}
                                          </Typography>
                                          <Typography
                                            variant='body2'
                                            sx={{ color: 'text.secondary' }}
                                            noWrap
                                          >
                                            {row.product.description_formatted}
                                          </Typography>
                                        </Box>
                                      </TableCell>
                                      <TableCell align='left'>{row.order_quantity}</TableCell>
                                      <TableCell align='left'>
                                        <Incrementer
                                          quantity={add(row.order_quantity, row.received_quantity)}
                                          onDecrease={() => handleDecrease(row.product.product_id)}
                                          onIncrease={() => handleIncrease(row.product.product_id)}
                                        />
                                      </TableCell>
                                      <TableCell align='left'>{row.unit_price}</TableCell>
                                      <TableCell align='left'>
                                        {fCurrency(multiply(add(row.order_quantity, row.received_quantity), (row.unit_price)))}
                                      </TableCell>

                                    </TableRow>
                                  ))}

                                </TableBody>
                                <TableFooter>
                                  <TableRow>
                                    <TableCell colSpan={5} align='right'>
                                      <FormControlLabel
                                        {...getFieldProps('needs_admin_verification')}
                                        onChange={() =>
                                          setFieldValue('needs_admin_verification', !getFieldProps('needs_admin_verification').value, true)
                                        }
                                        control={<Switch />} label='Necesita veficacion de precios' />
                                    </TableCell>
                                    <TableCell>
                                      {fCurrency(values.subTotal)}
                                    </TableCell>
                                  </TableRow>
                                </TableFooter>
                              </Table>
                            </TableContainer>
                          </Scrollbar>
                        </Grid>

                      </Grid>


                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>

                  <PurchaseReceiveOrderSummary
                    total={subTotal + parseFloat(values.freight)}
                    subtotal={subTotal}
                    shipping={parseFloat(values.freight)}

                  />
                  <LoadingButton
                    pending={isSubmitting}
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                  >
                    Confirmar
                  </LoadingButton>
                </Grid>

              </Grid>


            </Form>
          </FormikProvider>
        )}


      </Container>
    </Page>
  );
}
