import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { Form, FormikProvider, useFormik } from 'formik';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import {
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  FormControl,
  InputAdornment,
  FormHelperText, LinearProgress
} from '@material-ui/core';


import { QuillEditor } from '../../../../components/editor';
import { UploadMultiFile } from '../../../../components/upload';
import CategoriesSearchBox from '../categories/CategoriesSearchBox';
import SubCategoriesByCategorySearchBox from '../subcategories/SubCategoriesByCategorySearchBox';
import apiProducts from '../../../../services/api/ecommerce/apiProducts';
import apiProductImage from '../../../../services/api/ecommerce/apiProductImage';
import apiProductImages from '../../../../services/api/ecommerce/apiProductImages';
import BrandsSearchBox from '../../brands/BrandsSearchBox';
import UnitsMeasuresSearchBox from '../../unit_measure/UnitsMeasuresSearchBox';


const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

AddNewProductForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object
};

export default function AddNewProductForm({ isEdit, currentProduct }) {


  const { enqueueSnackbar } = useSnackbar();
  const { productId } = useParams();

  const [category, setCategory] = useState(undefined);
  const [subcategory, setSubCategory] = useState(undefined);
  const [brand, setBrand] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [unitSize, setUnitSize] = useState(undefined);
  const [unitSizes, setUnitSizes] = useState([]);
  const [unitWeight, setUnitWeight] = useState(undefined);
  const [unitWeights, setUnitWeights] = useState([]);

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Nombre requerido'),
    description: Yup.string().required('Descripcion requerido'),
    price: Yup.number().required('Precio requerido'),
    sku: Yup.string().required('SKU requerido'),
    color: Yup.string().required('Color requerido'),
    size: Yup.string().required('Tamaño/Presentación requerido'),
    size_unit_measure_code: Yup.string().required('Medida para Tamaño/Presentación requerida'),
    cost: Yup.number().required('Costo requerido'),
    product_category_id: Yup.number().required('Categoria requerida'),
    brand_id: Yup.number().required('Marca requerida'),
    product_subcategory_id: Yup.number().required('SubCategoria requerida')

  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      images: currentProduct?.images || [],
      code: currentProduct?.code || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.list_price || '',
      product_category_id: currentProduct?.product_category_id || '',
      product_subcategory_id: currentProduct?.product_subcategory_id || '',
      brand_id: currentProduct?.brand_id || '',
      color: currentProduct?.color || '',
      size: currentProduct?.size || '',
      size_unit_measure_code: currentProduct?.size_unit_measure_code || '',
      weight: currentProduct?.weight || '',
      weight_unit_measure_code: currentProduct?.weight_unit_measure_code || '',
      cost: currentProduct?.standard_cost || ''
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors, setFieldValue }) => {
      try {
        const formData = new FormData();


        values.images.forEach((image) => {
          formData.append('images[]', image);
        });


        formData.append('name', values.name);
        formData.append('sku', values.sku);
        formData.append('code', values.code);
        formData.append('description', values.description);
        formData.append('product_subcategory_id', values.product_subcategory_id);
        formData.append('price', values.price);
        formData.append('color', values.color);
        formData.append('size', values.size);
        formData.append('size_unit_measure_code', values.size_unit_measure_code);
        formData.append('cost', values.cost);
        formData.append('weight_unit_measure_code', values.weight_unit_measure_code);
        formData.append('weight', values.weight);
        formData.append('brand_id', values.brand_id);

        setSubmitting(true);

        if (!isEdit) {
          await apiProducts.post(formData);
        } else {
          await apiProducts.patch(values, productId);
        }
        setBrand(undefined);

        setFieldValue('brand_id', '');
        setFieldValue('weight_unit_measure_code', '');
        setFieldValue('size_unit_measure_code', '');
        resetForm();

        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Creado correctamente' : 'Actualizado correctamente', { variant: 'success' });

      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;


  const { status: productStatus, isFetching } = useQuery(['product_edit', productId],
    async () => {
      const product = await apiProducts.getSingle(productId);

      setFieldValue('sku', product.sku);
      setFieldValue('code', product.code ?? '');
      setFieldValue('name', product.name);
      setFieldValue('description', product.description);
      setFieldValue('product_subcategory_id', product.subcategory.product_subcategory_id);
      setFieldValue('product_category_id', product.subcategory.category.product_category_id);
      setFieldValue('color', product.color);
      setFieldValue('brand_id', product.brand_id);
      setFieldValue('size_unit_measure_code', product.size_unit_measure_code);
      setFieldValue('weight_unit_measure_code', product.weight_unit_measure_code);
      setFieldValue('size', product.size);
      setFieldValue('price', product.current_price?.value ?? '');

      setFieldValue(
        'images',
        product.images.map((image) =>
          Object.assign(image, {
            preview: image.path,
            name: image.file_name
          })
        )
      );
      setCategories([product.subcategory.category]);
      setSubCategories([product.subcategory]);
      setSubCategory(product.subcategory);
      setCategory(product.subcategory.category);
      setBrand(product.brand);
      setBrands([product.brand]);
      setUnitSizes([product.sizeMeasure]);
      setUnitSize(product.sizeMeasure);

      setUnitWeights([product.weightMeasure]);
      setUnitWeight(product.weightMeasure);

    }
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      enabled: isEdit
    });


  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFieldValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFieldValue]
  );

  const handleRemoveAll = async () => {
    if (isEdit) {
      await apiProductImages.remove(productId);
      enqueueSnackbar('Imagenes removidas correctamente', { variant: 'success' });
    }
    setFieldValue('images', []);
  };

  const handleUploadFiles = async () => {

    if (isEdit) {
      const formData = new FormData();
      formData.append('product_id', productId);
      values.images.forEach((image) => {
        formData.append('images[]', image);
      });
      await apiProductImage.post(formData);
      enqueueSnackbar('Imagenes guardadas correctamente', { variant: 'success' });
    }
  };
  const handleRemove = async (file) => {

    if (file.product_photo_id) {
      await apiProductImage.remove(file.product_photo_id);
      enqueueSnackbar('Imagen removida correctamente', { variant: 'success' });
    }

    const filteredItems = values.images.filter((_file) => _file !== file);
    setFieldValue('images', filteredItems);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete='off' onSubmit={handleSubmit}>

        {productStatus === 'loading' && <LinearProgress />}
        {(!isFetching || !isEdit) &&
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label='Nombre'
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <div>
                  <LabelStyle>Descripcion</LabelStyle>
                  <QuillEditor
                    simple
                    placeholder='Escribir una descripcion'
                    id='product-description'
                    value={values.description}
                    onChange={(val) => setFieldValue('description', val)}
                    error={Boolean(touched.description && errors.description)}
                  />
                  {touched.description && errors.description && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.description && errors.description}
                    </FormHelperText>
                  )}
                </div>
                <div>
                  <LabelStyle>Agregar Imagenes</LabelStyle>
                  <UploadMultiFile
                    showPreview
                    onUploadFiles={handleUploadFiles}
                    showUploadFiles={isEdit}
                    maxSize={3145728}
                    accept='image/*'
                    files={values.images}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    error={Boolean(touched.images && errors.images)}
                  />
                  {touched.images && errors.images && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.images && errors.images}
                    </FormHelperText>
                  )}
                </div>

              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth
                               label='Codigo'
                               {...getFieldProps('code')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      error={Boolean(touched.sku && errors.sku)}
                      helperText={touched.sku && errors.sku}
                      fullWidth
                      label='SKU'
                      {...getFieldProps('sku')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <LabelStyle>Categoria</LabelStyle>
                      <CategoriesSearchBox
                        onChange={(event, newValue) => {
                          setFieldValue('product_category_id', newValue?.product_category_id || '', true);
                        }}
                        error={Boolean(touched.product_category_id && errors.product_category_id)}
                        required
                        getFieldProps={getFieldProps('product_category_id')}
                        category={category}
                        categories={categories}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <LabelStyle>SubCategoria</LabelStyle>
                      <SubCategoriesByCategorySearchBox
                        onChange={(event, newValue) => {
                          setFieldValue('product_subcategory_id', newValue?.product_subcategory_id || '', true);
                        }}
                        error={Boolean(touched.product_subcategory_id && errors.product_subcategory_id)}
                        required
                        getFieldProps={getFieldProps('product_subcategory_id')}
                        category_id={values.product_category_id}
                        subCategory={subcategory}
                        subcategories={subcategories}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <LabelStyle>Marca</LabelStyle>
                      <BrandsSearchBox
                        onChange={(event, newValue) => {
                          setFieldValue('brand_id', newValue?.brand_id || '', true);
                        }}
                        error={Boolean(touched.brand_id && errors.brand_id)}
                        required
                        getFieldProps={getFieldProps('brand_id')}
                        brand={brand}
                        brands={brands}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Card>
              <Card sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      placeholder='0.00'
                      label='Precio de venta'
                      {...getFieldProps('price')}
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>Q</InputAdornment>,
                        type: 'number'
                      }}
                      error={Boolean(touched.price && errors.price)}
                      helperText={touched.price && errors.price}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      placeholder='0.00'
                      label='Costo'
                      {...getFieldProps('cost')}
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>Q</InputAdornment>,
                        type: 'number'
                      }}
                      error={Boolean(touched.cost && errors.cost)}
                      helperText={touched.cost && errors.cost}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label='Tamaño/Presentación'
                      {...getFieldProps('size')}
                      error={Boolean(touched.size && errors.size)}
                      helperText={touched.size && errors.size}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <UnitsMeasuresSearchBox
                        placeholder='Medida para Tamaño'
                        onChange={(event, newValue) => {

                          setFieldValue('size_unit_measure_code', newValue?.unit_measure_code || '', true);
                        }}
                        error={Boolean(touched.size_unit_measure_code && errors.size_unit_measure_code)}
                        required
                        getFieldProps={getFieldProps('size_unit_measure_code')}
                        unit={unitSize}
                        units={unitSizes}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      fullWidth
                      label='Color'
                      {...getFieldProps('color')}
                      error={Boolean(touched.color && errors.color)}
                      helperText={touched.color && errors.color}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label='Peso'
                      {...getFieldProps('weight')}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <UnitsMeasuresSearchBox
                        placeholder='Medida para Peso'
                        onChange={(event, newValue) => {
                          setFieldValue('weight_unit_measure_code', newValue?.unit_measure_code || '', true);
                        }}
                        error={Boolean(touched.weight_unit_measure_code && errors.weight_unit_measure_code)}
                        getFieldProps={getFieldProps('weight_unit_measure_code')}
                        unit={unitWeight}
                        units={unitWeights}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Card>
              <LoadingButton type='submit'
                             fullWidth
                             variant='contained'
                             size='large'
                             pending={isSubmitting}>
                {!isEdit ? 'Crear producto' : 'Guardar'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
        }
      </Form>
    </FormikProvider>
  )
    ;
}
