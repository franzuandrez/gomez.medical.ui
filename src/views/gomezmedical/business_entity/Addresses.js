import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {Form, FormikProvider, useFormik} from 'formik';
import {useQuery} from 'react-query';
import {useState} from 'react';
import {useSnackbar} from 'notistack';
import {useDispatch} from 'react-redux';
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
    FormControl, InputLabel, MenuItem, FormHelperText, CardHeader, FormControlLabel, Switch
} from '@material-ui/core';
// utils
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';

import {LoadingButton} from '@material-ui/lab';
import apiAddressesType from '../../../services/api/people/apiAddressesType';
import apiBusinessEntityAddress from '../../../services/api/businessEntity/apiBusinessEntityAddress';
import {addAddress} from '../../../redux/slices/customer';
import apiDefaultAddress from "../../../services/api/address/apiDefaultAddress";


//

// ----------------------------------------------------------------------

Addresses.propTypes = {
    businessEntity: PropTypes.object,
    openWithMinimalInformation: PropTypes.bool,
    onAdressAdded: PropTypes.func
};

export default function Addresses({businessEntity, openWithMinimalInformation = false, onAdressAdded}) {


    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const [addresses, setAddresses] = useState(businessEntity?.addresses || []);
    const [defaultAddressSelected, setDefaultAddressSelected] = useState(false);
    const {data: addressesType} = useQuery('addresses_type', apiAddressesType.getAll);
    const {data: defaultAddress} = useQuery('default_address', apiDefaultAddress.getAll);

    const AddressSchema = Yup.object().shape({
        address_line_1: Yup.string().required('La dirección primaria es requerida'),
        city: Yup.string().required('La ciudad es requerida'),
        address_type_id: Yup.string().required('Tipo de dirección  requerida')

    });
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            address_id: '',
            address_line_1: '',
            address_line_2: '',
            postal_code: '',
            city: '',
            address_type_id: '',
            business_entity_id: businessEntity?.business_entity_id
        },
        validationSchema: AddressSchema,
        onSubmit: async (values, {setSubmitting, resetForm}) => {

            let result;
            if (values.address_id !== '') {
                result = await apiBusinessEntityAddress.put(values,values.business_entity_id);
            } else {
                result = await apiBusinessEntityAddress.post(values);
            }

            if (result.status) {
                console.log(result)
                enqueueSnackbar(result.data.message, {variant: 'error'});
            } else {
                setAddresses([
                    ...addresses,
                    {
                        business_address_id: result.business_address_id,
                        address: result.address,
                        address_type: result.address_type
                    }
                ]);

                enqueueSnackbar('Dirección agregada correctamente', {variant: 'success'});
                dispatch(addAddress(result));
                onAdressAdded()
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


    const handleChangeAddressType = (event) => {
        setFieldValue('address_type_id', event.target.value, true);
    };
    const handleClickCancel = () => {
        resetForm();
    };

    const handleSetDefaultAddress = () => {

        if (!defaultAddressSelected) {
            setFieldValue('address_line_1', defaultAddress.address_line_1, true);
            setFieldValue('address_id', defaultAddress.address_id, true);
            setFieldValue('city', defaultAddress.city, true);
            setFieldValue('address_type_id', '531', true);// TODO

        } else {
            setFieldValue('address_line_1', '', true);
            setFieldValue('address_id', '', true);
            setFieldValue('city', '', true);
            setFieldValue('address_type_id', '', true);

        }
        setDefaultAddressSelected(!defaultAddressSelected)


    }
    return (

        <FormikProvider value={formik}>
            <Form autoComplete='off' noValidate onSubmit={handleSubmit}>

                <Card>
                    <CardHeader
                        title='Dirección'
                    />
                    <CardContent>
                        <FormControlLabel
                            onChange={() =>
                                handleSetDefaultAddress()
                            }
                            control={
                                <Switch
                                    checked={defaultAddressSelected}
                                />
                            }
                            label='CIUDAD'
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    disabled={defaultAddressSelected}
                                    label='Dirección primaria'
                                    {...getFieldProps('address_line_1')}
                                    value={values.address_line_1}
                                    error={Boolean(touched.address_line_1 && errors.address_line_1) && !defaultAddressSelected}
                                    helperText={(!defaultAddressSelected) ?? (touched.address_line_1 && errors.address_line_1)}
                                />
                            </Grid>
                            {!openWithMinimalInformation &&
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label='Dirección secundaria'
                                        {...getFieldProps('address_line_2')}
                                        value={values.address_line_2}

                                    />
                                </Grid>
                            }
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label='Ciudad'
                                    disabled={defaultAddressSelected}
                                    {...getFieldProps('city')}
                                    value={values.city}
                                    error={Boolean(touched.city && errors.city) && !defaultAddressSelected}
                                    helperText={(!defaultAddressSelected) ?? (touched.city && errors.city)}
                                />
                            </Grid>
                            {!openWithMinimalInformation &&
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label='Código Postal'
                                        disabled={defaultAddressSelected}
                                        {...getFieldProps('postal_code')}
                                        value={values.postal_code}

                                    />
                                </Grid>
                            }
                        </Grid>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.address_type_id && errors.address_type_id)}
                        >
                            <InputLabel>Tipo de dirección</InputLabel>
                            <Select
                                required
                                fullWidth
                                disabled={defaultAddressSelected}
                                sx={{mb: 3}}
                                {...getFieldProps('address_type_id')}
                                onChange={handleChangeAddressType}
                            >
                                {
                                    addressesType && addressesType.map(type =>
                                        <MenuItem
                                            key={`addressesType-${type.address_type_id}`} value={type.address_type_id}>
                                            {type.name}
                                        </MenuItem>
                                    )
                                }
                            </Select>
                            <FormHelperText>  {touched.address_type_id && errors.address_type_id}</FormHelperText>
                        </FormControl>

                        <Box sx={{mt: 3, display: 'flex', justifyContent: 'flex-end'}}>
                            <Button
                                type='button'
                                color='inherit'
                                variant='outlined'
                                sx={{mr: 1.5}}
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
                                <Table aria-label='Direcciones'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Direccion Primaria</TableCell>
                                            <TableCell>Direccion Secundaria</TableCell>
                                            <TableCell>Ciudad</TableCell>
                                            <TableCell>Código Postal</TableCell>
                                            <TableCell>Tipo de dirección</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {addresses.map((address) => (
                                            <TableRow key={address.business_address_id}>
                                                <TableCell component='th' scope='row'>
                                                    {address.address.address_line_1}
                                                </TableCell>
                                                <TableCell> {address.address.address_line_2}</TableCell>
                                                <TableCell>{address.address.city}</TableCell>
                                                <TableCell>{address.address.postal_code}</TableCell>
                                                <TableCell>{address.address_type.name}</TableCell>
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
