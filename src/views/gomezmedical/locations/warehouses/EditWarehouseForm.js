import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import { LoadingButton } from '@material-ui/lab';
import { Container, TextField } from '@material-ui/core';
import { updateWarehouse, fetchWarehouseById } from '../../../../redux/slices/warehouseSlice';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import { PATH_APP } from '../../../../routes/paths';
import LoadingScreen from '../../../../components/LoadingScreen';


export default function EditWarehouseForm() {


  const { warehouseId } = useParams();


  const { enqueueSnackbar } = useSnackbar();


  const warehouseStatus = useSelector(state => state.warehouse.status);
  const warehouse = useSelector(
    state => state.warehouse.warehouses.find(warehouse => String(warehouse.warehouse_id) === warehouseId)
  );

  const [addRequestStatus, setAddRequestStatus] = useState(warehouseStatus);
  const dispatch = useDispatch();


  const WarehouseSchema = Yup.object().shape({
    name: Yup.string()
      .required('Nombre requerido')
  });


  const formik = useFormik({
    initialValues: {
      warehouseId: '',
      name: ''
    },
    validationSchema: WarehouseSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        setAddRequestStatus('pending');

        const resultAction = await dispatch(
          updateWarehouse(values)
        );
        unwrapResult(resultAction);

        setSubmitting(false);
        enqueueSnackbar('Guardado correctamente', { variant: 'success' });

      } catch (error) {
        setSubmitting(false);
        setErrors({ afterSubmit: error.message });
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setAddRequestStatus('idle');
      }
    }
  });
  const {
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;


  useEffect(() => {

    if (!warehouse) {
      setAddRequestStatus('loading');
      dispatch(fetchWarehouseById({ warehouseId })).then((data) => {
        setAddRequestStatus('succeeded');
        const { warehouse_id, name } = data.payload;
        setFieldValue('name', name, true);
        setFieldValue('warehouseId', warehouse_id, true);
      });
    } else {
      setFieldValue('name', warehouse.name, true);
      setFieldValue('warehouseId', warehouse.warehouse_id, true);
    }

  }, [warehouseStatus, warehouse, dispatch, setFieldValue, warehouseId]);


  return (

    <Page title='Bodega: Editar | Gomez-Medical'>
      <Container>

        <HeaderDashboard
          heading='Editar  Bodega'
          links={[
            { name: 'Bodegas', href: PATH_APP.locations.warehouses.root },
            { name: 'Editar' }
          ]}

        />

        <FormikProvider value={formik}>

          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField
              label='Nombre'
              variant='outlined'
              color='primary'
              fullWidth
              required

              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}

            />

            <LoadingButton
              type='submit'
              variant='contained'
              color='primary'
              pending={isSubmitting}
            >
              Guardar
            </LoadingButton>
            {addRequestStatus === 'loading' && <LoadingScreen />}
          </form>
        </FormikProvider>
      </Container>
    </Page>
  );


};
