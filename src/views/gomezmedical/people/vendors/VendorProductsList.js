import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Grid,
  Card,
  Button,
  Typography,
  TableCell,
  Table,
  CardContent, TextField, Toolbar, CardHeader

} from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { LoadingButton } from '@material-ui/lab';

import { experimentalStyled as styled } from '@material-ui/core/styles';
import ProductSearchBar from '../../ecommerce/products/ProductSearchBar';
import apiProducts from '../../../../services/api/ecommerce/apiProducts';
import ModalEditVendorProduct from './ModalEditVendorProduct';
import apiVendorProducts from '../../../../services/api/people/apiVendorProducts';
import ModalDeleteVendorProduct from './ModalDeleteVendorProduct';

VendorProductsList.propTypes = {
  products: PropTypes.array,
  vendor_id: PropTypes.number.isRequired
};

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm
}));
const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

export default function VendorProductsList({ vendor_id, products }) {


  const [productsAdded, setProductsAdded] = useState(products);
  const { enqueueSnackbar } = useSnackbar();
  const [filterName, setFilterName] = useState('');
  const [productsSearched, setProductsSearched] = useState([]);

  const NewProductSchema = Yup.object().shape({
    cost: Yup.number().required('El costo es requerido'),
    product_id: Yup.number().required('Seleccione un producto')
  });

  const formik = useFormik({
    initialValues: {
      cost: '',
      product_id: ''
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {

      try {
        setSubmitting(true);
        const result = await apiVendorProducts.custom(`v1/vendors/${vendor_id}/products/${values.product_id}`, {
          method: 'post',
          data: values
        });
        handleClickCancel();
        if (result.status >= 200 && result.status < 300) {
          enqueueSnackbar('Agregado correctamente', { variant: 'success' });
        } else {
          setErrors(result.data.message);
          enqueueSnackbar(result.data.message, { variant: 'error' });
        }
      } catch (error) {
        setErrors(error);
        enqueueSnackbar(error, { variant: 'error' });

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
    setFieldValue,
    resetForm
  } = formik;


  const handleFilterByName = async (event) => {

    try {
      const { value } = event ? event.target : '';
      setFilterName(event.target.value);
      if (value) {
        const response = await apiProducts.getAll(`page=1&query=${value}&perPage=1`);
        const products = response.data;
        setProductsSearched(Object.keys(products).map((key) => products[key]));
        setFieldValue('product_id', products.length > 0 ? products[0].product_id : '');
        console.log(values, products, productsSearched);
      } else {
        setProductsSearched([]);
        setFieldValue('product_id', '');
      }
    } catch (error) {
      console.error(error);
      setFieldValue('product_id', '');
    }

  };
  const handleClickCancel = () => {
    resetForm();
    setProductsSearched([]);
    setFieldValue('product_id', '');
    setFilterName('');

  };


  useQuery(['VendorProducts', vendor_id], async () => {
    const data = await apiVendorProducts.custom(`v1/vendors/${vendor_id}/products`);

    setProductsAdded(data);
    return data;
  }, {
    keepPreviousData: true

  });


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <FormikProvider value={formik}>
          <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader
                title='Productos'
              />
              <CardContent>
                <Grid container spacing={2}>
                  <ProductSearchBar
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                  />
                  <RootStyle
                  >
                    <TextField
                      label='Costo'
                      value={values.cost}
                      {...getFieldProps('cost')}
                      error={Boolean(touched.cost && errors.cost)}
                      helperText={touched.cost && errors.cost}
                    />
                  </RootStyle>
                </Grid>

                <Grid container>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          Producto
                        </TableCell>
                        <TableCell>
                          SKU
                        </TableCell>
                        <TableCell>
                          Categoria
                        </TableCell>
                        <TableCell>
                          SubCategoria
                        </TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productsSearched.map((product) => (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={`product-fetched-${product.product_id}`}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component='td' scope='row' padding='none'>
                            <Box
                              sx={{
                                py: 2,
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              <ThumbImgStyle alt={product.name}
                                             src={product.images.length > 0 ? product.images[0].path : ''}
                              />
                              <Typography variant='subtitle2' noWrap>
                                {product.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell component='td' scope='row' padding='none'>
                            {product.sku}
                          </TableCell>
                          <TableCell component='td' scope='row' padding='none'>
                            {product.subcategory?.category?.name}
                          </TableCell>
                          <TableCell component='td' scope='row' padding='none'>
                            {product.subcategory?.name}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>

                  <Button
                    type='button'
                    color='inherit'
                    variant='outlined'
                    sx={{ mr: 1.5 }}
                    onClick={handleClickCancel}
                  >
                    Cancelar
                  </Button>

                  <LoadingButton
                    type='submit'
                    variant='contained'
                    color='primary'
                    pending={isSubmitting}
                  >
                    Agregar
                  </LoadingButton>
                </Box>
              </CardContent>
            </Card>
          </Form>
        </FormikProvider>
      </Grid>
      <Grid item xs={12} md={12}>
        <TableContainer component={Paper}>
          <Table aria-label='Direcciones'>
            <TableHead>
              <TableRow>
                <TableCell>
                  Producto
                </TableCell>
                <TableCell>
                  Costo
                </TableCell>
                <TableCell>
                  Opciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsAdded && productsAdded.map((product) => (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={`product-${product.product.product_id}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='td' scope='row' padding='none'>
                    <Box
                      sx={{
                        py: 2,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <ThumbImgStyle alt={product.product.name}
                                     src={product.product.images.length > 0 ? product.product.images[0].path : ''}
                      />
                      <Typography variant='subtitle2' noWrap>
                        {product.product.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell component='td' scope='row' padding='none'>
                    {product.cost}
                  </TableCell>
                  <TableCell component='td' scope='row' padding='none'>
                    <ModalEditVendorProduct
                      product={product.product}
                      vendor_id={product.vendor_id}
                      cost={product.cost}
                    />
                    <ModalDeleteVendorProduct
                      product={product.product}
                      vendor_id={product.vendor_id}
                    />

                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Grid>

    </Grid>
  );
}
