import * as Yup from 'yup';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { add, filter, multiply } from 'lodash';
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  LinearProgress,
  Stack
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { Form, FormikProvider, useFormik } from 'formik';
// routes
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import apiPurchaseFinishPriceEdition from '../../../../services/api/purchasing/apiPurchaseFinishPriceEdition';
import apiPurchase from '../../../../services/api/purchasing/apiPurchase';
import PurchaseReceiveOrderSummary from './PurchaseReceiveOrderSummary';
import PurchaseOrderProductsToReceive from './PurchaseOrderProductsToReceive';

export default function PurchaseOrderShowEditPrices() {

  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();


  const PurchaseEditPricesSchema = Yup.object().shape({
    products: Yup.array().required('Productos requeridos')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      products: [],
      subTotal: 0,
      freight: 0
    },

    validationSchema: PurchaseEditPricesSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setSubmitting(true);
        await apiPurchaseFinishPriceEdition.patch(values, id);
        enqueueSnackbar('Verificación terminada', { variant: 'success' });
        resetForm();
        setSubmitting(false);


      } catch (error) {
        setSubmitting(false);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    }
  });

  const {
    values,
    isSubmitting,
    handleSubmit,
    setFieldValue
  } = formik;

  const { isLoading } = useQuery(['purchase_edit_prices', id],
    async () => {
      const data = await apiPurchase.getSingle(id);
      setFieldValue('freight',data.freight);
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

  return (
    <Page title='Orden: V. Precios | Minimal-UI'>
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
            { name: 'Verificar precios' }
          ]}
        />
        {isLoading ? (<LinearProgress />) : (
          <FormikProvider value={formik}>
            <Form autoComplete='off' noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Card>
                    <CardHeader
                      title='Verificación de precios'

                    />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                          <PurchaseOrderProductsToReceive formik={formik}
                                                          editPrices
                                                          handleDecrease={handleDecrease}
                                                          handleIncrease={handleIncrease}
                                                          handleEditProductPrice={handleEditProductPrice}
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
                    <LoadingButton
                      fullWidth
                      size='large'
                      pending={isSubmitting}
                      onClick={handleSubmit}
                      variant='contained'
                    >
                      Confirmar
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
