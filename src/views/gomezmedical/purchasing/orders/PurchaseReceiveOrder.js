import * as Yup from 'yup';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import {useHistory} from "react-router";
import { useParams } from 'react-router-dom';
import { add, filter, multiply } from 'lodash';
import {
  Card,
  CardContent,
  CardHeader,
  Container, FormControl, FormHelperText,
  Grid,
  LinearProgress, Stack,
  TextField
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Form, FormikProvider, useFormik } from 'formik';
// routes
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import ShipMethodSearchBox from '../ship_method/ShipMethodSearchBox';
import apiPurchase from '../../../../services/api/purchasing/apiPurchase';
import PurchaseReceiveOrderSummary from './PurchaseReceiveOrderSummary';
import PurchaseOrderProductsToReceive from './PurchaseOrderProductsToReceive';


export default function PurchaseReceiveOrder() {

  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const PurchaseReceiveSchema = Yup.object().shape({
    ship_method_id: Yup.number().required('Metodo de envio requerido'),
    freight: Yup.number().typeError('Introduce una cantida válida').required('Costo requerido')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ship_method_id: '',
      freight: 0,
      products: [],
      subTotal: 0,
      is_paid: false,
      needs_admin_verification: false
    },

    validationSchema: PurchaseReceiveSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setSubmitting(true);
        await apiPurchase.put(values, id);
        enqueueSnackbar('Recepcionado correctamente', { variant: 'success' });
        resetForm();
        setSubmitting(false);
        history.push(`${PATH_APP.purchasing.orders.root}/${id}`);

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

  const { isLoading } = useQuery(['purchase_receive', id],
    async () => {
      const data = await apiPurchase.getSingle(id);
      setFieldValue('products', data.detail);
      const subTotal = getSubTotal(data.detail);
      setFieldValue('subTotal', subTotal);
      return data;
    }
    , {
      refetchOnWindowFocus: false
    });


  const handleIncrease = (productId) => {

    const { products } = values;
    const product = filter(products,
      (_product) => _product.product.product_id === productId
    );
    product[0].received_quantity = add(product[0].received_quantity, 1);
    const newListOfProducts = [...products];
    setFieldValue('subTotal', getSubTotal(newListOfProducts));
    setFieldValue('products', newListOfProducts);

  };


  const handleDecrease = (productId) => {
    const { products } = values;
    const product = filter(products,
      (_product) => _product.product.product_id === productId
    );

    product[0].received_quantity = add(product[0].received_quantity, -1);
    const newListOfProducts = [...products];
    setFieldValue('subTotal', getSubTotal(newListOfProducts));
    setFieldValue('products', newListOfProducts);

  };
  const getSubTotal = (products) => {


    if (products.length === 0) {
      return 0;
    }
    return products.map(e => multiply(add(e.order_quantity, e.received_quantity), e.unit_price))
      .reduce((x, y) => (x + y), 0);

  };

  const handleEditProductPrice = (id, newPrice) => {

    const products = values.products.map((product) => {

      if (product.id === id) {
        product.unit_price = newPrice;
      }
      return product;
    });
    setFieldValue('products', products);
    setFieldValue('subTotal', getSubTotal(products));
  };

  const handleConfirmAndPay = () => {
    setFieldValue('is_paid', true);
    handleSubmit();
  };

  const handleJustConfirm = () => {

    handleSubmit();
  };

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
            <Form autoComplete='off' noValidate>
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
                              setFieldValue('ship_method_id', newValue?.ship_method_id || '', true);
                            }}
                            error={Boolean(touched.ship_method_id && errors.ship_method_id)}
                          />
                          <FormControl error={Boolean(touched.ship_method_id && errors.ship_method_id)}
                                       variant='standard'>
                            <FormHelperText>{touched.ship_method_id && errors.ship_method_id}</FormHelperText>
                          </FormControl>
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
                          <PurchaseOrderProductsToReceive formik={formik}
                                                          handleEditProductPrice={handleEditProductPrice}
                                                          handleDecrease={handleDecrease}
                                                          handleIncrease={handleIncrease}
                          />
                        </Grid>

                      </Grid>


                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>

                  <PurchaseReceiveOrderSummary
                    total={values.subTotal + parseFloat(values.freight)}
                    subtotal={values.subTotal}
                    shipping={parseFloat(values.freight)}

                  />
                  <Stack spacing={2}>
                    {isSubmitting && <LinearProgress />}
                    <LoadingButton
                      fullWidth
                      size='large'
                      onClick={handleConfirmAndPay}
                      variant='contained'
                    >
                      Confirmar y pagar
                    </LoadingButton>
                    <LoadingButton
                      fullWidth
                      size='large'
                      onClick={handleJustConfirm}
                      variant='contained'
                    >
                      Solo confirmar
                    </LoadingButton>
                  </Stack>
                </Grid>

              </Grid>


            </Form>
          </FormikProvider>
        )}


      </Container>
    </Page>
  );
}
