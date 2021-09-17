import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useQuery } from 'react-query';
import * as Yup from 'yup';
import { formatISO } from 'date-fns';
import { Form, FormikProvider, useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl, FormHelperText,
  Grid, InputLabel, LinearProgress,
  Link, MenuItem,
  Stack, TableBody, TableContainer, TextField
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Select from '@material-ui/core/Select';
import { LoadingButton } from '@material-ui/lab';
import { PATH_APP } from '../../../../routes/paths';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import apiInventoryManagement from '../../../../services/api/inventory/apiInventoryManagement';
import apiProducts from '../../../../services/api/ecommerce/apiProducts';
import CategoriesSearchBox from '../../ecommerce/categories/CategoriesSearchBox';
import SubCategoriesSearchBox from '../../ecommerce/subcategories/SubCategoriesSearchBox';
import BinSearchBox from '../../locations/bins/BinSearchBox';
import ProductSearchBar from '../../ecommerce/products/ProductSearchBar';
import apiStockByType from '../../../../services/api/inventory/apiStockByType';


export default function PhysicalInventoryNew() {

  const { enqueueSnackbar } = useSnackbar();

  const [loadingInventory, setLoadingInventory] = useState(false);
  const [typeId, setTypeId] = useState('');
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [product, setProduct] = useState(null);
  const [queryProduct, setQueryProduct] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [products, setProducts] = useState([]);

  const PhysicalInventoryNewSchema = Yup.object().shape({
    type: Yup.string().required('Tipo requerido'),
    type_id: Yup.string().required('Id tipo requerido')
  });

  const { isLoading } = useQuery(
    ['search_products', queryProduct],
    async () => {
      const response = await apiProducts.getAll(`page=1&query=${queryProduct}&perPage=1`);
      const products = response.data;
      setProduct(products.length > 0 ? products[0] : null);
      setTypeId(products.length > 0 ? products[0].product_id : null);
    },
    {
      enabled: !!queryProduct,
      keepPreviousData: true,
      refetchOnWindowFocus: false
    }
  );

  const handleSearchProduct = async (event) => {

    try {
      const { value } = event ? event.target : '';

      setQueryProduct(event.target.value);
      if (!value) {
        setProduct(null);
      }
    } catch (error) {

      setProduct(null);
    }

  };


  const handleStartPhysicalInventory = async () => {

    setLoadingInventory(true);
    const result = await apiStockByType.getAll(`type=${type}&type_id=${typeId}`);
    setLoadingInventory(false);
    if (result.length === 0) {
      setIsStarted(false);
      enqueueSnackbar('No hay existencias', { variant: 'warning' });
    } else {
      setProducts(result.map(prod => ({ ...prod, physical_quantity: 0, touched: false })));
      setStartDate(formatISO(new Date()));
      console.log(formatISO(new Date()));
      setIsStarted(true);
    }

  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      type,
      type_id: typeId,
      start_date: startDate,
      products
    },
    validationSchema: PhysicalInventoryNewSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {

        setSubmitting(true);
        const result = await apiInventoryManagement.post(values);

        if (result.status > 300) {
          enqueueSnackbar('Hubo un inconveniente al procesar su petición', { variant: 'error' });
        } else {
          enqueueSnackbar('Creado correctamente', { variant: 'success' });
        }
        resetForm();
        setProducts([]);
        setSubmitting(false);
        setIsStarted(false);


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
    getFieldProps

  } = formik;


  const handleChangeType = (event) => {

    setType(event.target.value);
    setTypeId('');
  };

  const onChangeQuantity = (event, id) => {

    const product = products.filter(product => product.id === id)[0];
    product.physical_quantity = event.target.value;
    product.touched = event.target.value !== '';
    setProducts([...products]);

  };

  const renderContent = () => {

    if (type === 'category') {
      return <CategoriesSearchBox
        disabled={isStarted}
        onChange={(event, newValue) => {
          setTypeId(newValue?.product_category_id);
        }}
        error={Boolean(touched.type_id && errors.type_id)}
        required
        getFieldProps={getFieldProps('type_id')}
      />;
    }
    if (type === 'subcategory') {
      return <SubCategoriesSearchBox
        disabled={isStarted}
        onChange={(event, newValue) => {
          if (event) {
            if (newValue) {
              setTypeId(newValue?.product_subcategory_id);
            }
          }
        }}
        error={Boolean(touched.type_id && errors.type_id)}
        required
        getFieldProps={getFieldProps('type_id')}
      />;
    }
    if (type === 'location') {
      return <BinSearchBox
        disabled={isStarted}
        onChange={(event, newValue) => {
          if (event) {
            if (newValue) {
              setTypeId(newValue?.name);
            }
          }
        }}
        error={Boolean(touched.type_id && errors.type_id)}
        required
        getFieldProps={getFieldProps('type_id')}
      />;
    }
    if (type === 'product') {
      return <div>
        <ProductSearchBar
          disabled={isStarted}
          filterName={queryProduct}
          onFilterName={handleSearchProduct}
        />
        <div>
          {isLoading ? <LinearProgress /> : product?.name}
        </div>
      </div>;
    }
  };


  return (
    <Page title='Inventario Físico: Nuevo | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Inventario Físico'
          links={[
            { name: 'Físico', href: PATH_APP.inventory.physicalInventory },
            { name: 'Nuevo' }
          ]}

        />
        <Grid container spacing={2}>

          <Grid item xs={12} md={12}>
            <Card>

              <FormikProvider value={formik}>
                <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <FormControl
                            fullWidth
                            error={Boolean(touched.type && errors.type)}
                          >
                            <InputLabel>Tipo</InputLabel>
                            <Select
                              required
                              fullWidth
                              sx={{ mb: 3 }}
                              disabled={isStarted}
                              value={values.type}
                              {...getFieldProps('type')}
                              onChange={handleChangeType}
                            >
                              <MenuItem key='type-category' value='category'>
                                Categoria
                              </MenuItem>
                              <MenuItem key='type-subcategory' value='subcategory'>
                                SubCategoria
                              </MenuItem>
                              <MenuItem key='type-location' value='location'>
                                Ubicación
                              </MenuItem>
                              <MenuItem key='type-product' value='product'>
                                Producto
                              </MenuItem>

                            </Select>
                            <FormHelperText>  {touched.type && errors.type}</FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={10} sm={4}>

                          {renderContent()}

                        </Grid>

                        <Grid item xs={2} sm={2}>

                          <LoadingButton
                            type='button'
                            variant='contained'
                            color='primary'
                            pending={loadingInventory}
                            onClick={handleStartPhysicalInventory}
                            disabled={!typeId || isStarted}
                          >
                            Iniciar
                          </LoadingButton>

                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>
                              <TableHead>
                                <TableRow>
                                  <TableCell align='center' colSpan={4}>
                                    {products.filter(product => !product.touched).length > 0 ? 'Cantidades pendientes de confirmar' : ''}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell>
                                    Producto
                                  </TableCell>
                                  <TableCell>
                                    Lote
                                  </TableCell>
                                  <TableCell>
                                    Ubicacion
                                  </TableCell>
                                  <TableCell>
                                    Cantidad Fisica
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>

                                {products.map(product => (
                                  <TableRow key={product.id}>
                                    <TableCell>
                                      {product.name}
                                    </TableCell>
                                    <TableCell>
                                      {product.batch}
                                    </TableCell>
                                    <TableCell>
                                      {product.bin}
                                    </TableCell>
                                    <TableCell>
                                      <TextField
                                        fullWidth
                                        onChange={(event) => onChangeQuantity(event, product.id)}
                                      />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>

                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>

                        <Link
                          component={RouterLink}
                          to={`${PATH_APP.inventory.physicalInventory}`}>
                          <Button
                            type='button'
                            color='inherit'
                            variant='outlined'
                            sx={{ mr: 1.5 }}
                          >
                            Cancelar
                          </Button>
                        </Link>

                        <LoadingButton
                          type='submit'
                          variant='contained'
                          color='primary'
                          disabled={!isStarted || products.filter(product => !product.touched).length > 0}
                          pending={isSubmitting}
                        >
                          Guardar
                        </LoadingButton>
                      </Box>
                    </CardContent>
                  </Stack>

                </Form>

              </FormikProvider>
            </Card>
          </Grid>


        </Grid>

      </Container>
    </Page>
  );
}
