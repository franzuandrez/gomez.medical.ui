import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
// material
import {
  Box,
  Grid,
  Card,
  Button,
  TableCell,
  Table,
  CardContent,
  TextField,
  FormControl, InputLabel, MenuItem, FormHelperText, CardHeader
} from '@material-ui/core';
// utils
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { LoadingButton } from '@material-ui/lab';
import apiBanks from '../../../services/api/people/apiBanks';
import apiBusinessEntityBankAccount from '../../../services/api/businessEntity/apiBusinessEntityBankAccount';


//

// ----------------------------------------------------------------------

BankAccounts.propTypes = {
  businessEntity: PropTypes.object
};

export default function BankAccounts({ businessEntity }) {


  const { enqueueSnackbar } = useSnackbar();
  const [bankAccounts, setBankAccounts] = useState(businessEntity?.bank_accounts || []);
  const { data: banks } = useQuery('banks', apiBanks.getAll);

  const BankSchema = Yup.object().shape({
    account_number: Yup.string().required('Numero de cuenta requerido'),
    bank_id: Yup.string().required('Banco requerido')

  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      bank_id: '',
      account_number: '',
      business_entity_id: businessEntity?.business_entity_id
    },
    validationSchema: BankSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {


      const result = await apiBusinessEntityBankAccount.post(values);
      if (result.status) {
        enqueueSnackbar(result.data.message, { variant: 'error' });
      } else {
        setBankAccounts([
          ...bankAccounts,
          {
            business_address_id: result.business_address_id,
            bank: result.bank,
            account_number: result.account_number
          }
        ]);

        enqueueSnackbar('Numero de cuenta agregada correctamente', { variant: 'success' });
        resetForm();
      }

      setSubmitting(false);

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


  const handleChangeBank = (event) => {
    setFieldValue('bank_id', event.target.value, true);
  };
  const handleClickCancel = () => {
    resetForm();
  };
  return (

    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Card>
          <CardHeader
            title='Cuenta'
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label='Número de cuenta'
                  {...getFieldProps('account_number')}
                  value={values.account_number}
                  error={Boolean(touched.account_number && errors.account_number)}
                  helperText={touched.account_number && errors.account_number}
                />
              </Grid>
            </Grid>

            <FormControl
              fullWidth
              error={Boolean(touched.bank_id && errors.bank_id)}
            >
              <InputLabel>Banco</InputLabel>
              <Select
                required
                fullWidth
                sx={{ mb: 3 }}
                {...getFieldProps('bank_id')}
                onChange={handleChangeBank}
              >
                {
                  banks && banks.map(type =>
                    <MenuItem key={`bank-${type.id}`} value={type.id}>
                      {type.name}
                    </MenuItem>
                  )
                }
              </Select>
              <FormHelperText>  {touched.bank_id && errors.bank_id}</FormHelperText>
            </FormControl>

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
            <Box>
              <TableContainer component={Paper}>
                <Table aria-label='Numeros de cuenta'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Número de cuenta</TableCell>
                      <TableCell>Banco</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bankAccounts.map((account) => (
                      <TableRow key={`bank-account-${account.id}`}>
                        <TableCell>{account.account_number}</TableCell>
                        <TableCell>{account.bank.name}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CardContent>
        </Card>
      </Form>
    </FormikProvider>

  );
}
