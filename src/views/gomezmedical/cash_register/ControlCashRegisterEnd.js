import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import {
  Box,
  Container, Grid, LinearProgress,
  Typography
} from '@material-ui/core';
import { useFormik } from 'formik';
import { PATH_APP } from '../../../routes/paths';
import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
import apiControlCashRegister from '../../../services/api/cash_register/apiControlCashRegister';
import Label from '../../../components/Label';
import ControlCashRegisterEndedDetailList from './ControlCashRegisterEndedDetailList';
import ControlCashRegisterEndList from './ControlCashRegisterEndList';


export default function ControlCashRegisterStart() {


  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [detail, setDetail] = useState([]);
  const [controlCashRegister, setControlCashRegister] = useState(null);

  const {
    isLoading
  } = useQuery(['control_cash_register_end', id], async () => {
      const result = await apiControlCashRegister.getSingle(id);
      const { detail } = result;
      detail.forEach(det => calculateAmount(0, det));
      setDetail(detail);
      setControlCashRegister(result);
      return result;
    }
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });

  const ControlCashRegisterSchema = Yup.object().shape({
    detail: Yup.array().of(
      Yup.object().shape({
        id: Yup.number().required('Id requerido'),
        counted: Yup.number().typeError('Debes digitar una cantidad válida').required('Monto requerido')
      })
    )
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      detail
    },

    validationSchema: ControlCashRegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {

        setSubmitting(true);
        const result = await apiControlCashRegister.patch(values, id);


        enqueueSnackbar('Caja correctamente cerrada correctamente', { variant: 'success' });
        setSubmitting(false);
        resetForm();
        setDetail([]);

        setControlCashRegister(controlCashRegister => ({
          control: {
            ...controlCashRegister.control,
            status: 'finalizado'
          },
          detail: [
            ...result.detail
          ]
        }));

      } catch (error) {

        setSubmitting(false);
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
      }
    }
  });


  const handleChangeAmount = (e, id) => {

    const det = detail.filter(det => det.id === id)[0];
    calculateAmount(e.target.value, det);
    setDetail([...detail]);

  };

  const calculateAmount = (counted, det) => {


    det.counted = counted;
    det.in_drawer = parseFloat(det.start_value) + parseFloat(det.income) - parseFloat(det.outcome);
    det.total_system = parseFloat(det.income) - parseFloat(det.outcome);
    det.difference = parseFloat(det.counted) - parseFloat(det.in_drawer);
    det.cash_out = parseFloat('0');
    det.new_start_value = det.counted - det.cash_out;

  };

  return (
    <Page title='Control Caja: Finalizar | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Iniciar Control de caja'
          links={[
            { name: 'Listado', href: PATH_APP.cash_register_control.controls.root },
            { name: 'Finalizar' }
          ]}

        />
        {controlCashRegister &&
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'left' } }}>
              <Typography
                paragraph
                variant='overline'
                sx={{ color: 'text.disabled' }}
              >
                General
              </Typography>
              <Typography variant='body2'>
                Vendedor: {controlCashRegister.control.sales_person.person.first_name} {controlCashRegister.control.sales_person.person.last_name}
              </Typography>
              <Typography variant='body2'>
                Turno: {controlCashRegister.control.shift.name}
              </Typography>

            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                color={controlCashRegister.control.status === 'finalizado' ? 'success' : 'warning'}
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {controlCashRegister.control.status}
              </Label>
              <Typography
                variant='h6'>Caja: {controlCashRegister.control.cash_register.cash_register_number}</Typography>

            </Box>

          </Grid>

        </Grid>
        }

        {isLoading && <LinearProgress />}

        {(controlCashRegister && controlCashRegister?.control?.status === 'finalizado') &&
        <ControlCashRegisterEndedDetailList detail={controlCashRegister.detail} />}

        {(controlCashRegister && controlCashRegister?.control?.status === 'iniciado') &&
        <ControlCashRegisterEndList formik={formik} handleChangeAmount={handleChangeAmount} />}
      </Container>
    </Page>
  )
    ;
}
