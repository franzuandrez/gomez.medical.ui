import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, TextField } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useSnackbar } from 'notistack';
// routes
import { PATH_APP } from '../../../../routes/paths';
// components
import Page from '../../../../components/Page';

import HeaderDashboard from '../../../../components/HeaderDashboard';
import { saveWarehouse } from '../../../../redux/slices/warehouse';


export default function NewWarehouse() {


  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const onNameChanged = e => setName(e.target.value);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();


  const onSaveWarehouseClicked = (e) => {
    e.preventDefault();

    setNameError(false);
    if (name === '') {
      setNameError(true);
    }
    if (name) {
      dispatch(
        saveWarehouse({
          name
        }, [dispatch])
      );
      enqueueSnackbar('Bodega guardada correctamente', { variant: 'success' });
      setName('');
    }
  };

  return (
    <Page title='Bodega: Crear | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Nueva  Bodega'
          links={[
            { name: 'Bodegas', href: PATH_APP.locations.warehouses.root },
            { name: 'Crear' }
          ]}

        />

        <form noValidate autoComplete='off' onSubmit={onSaveWarehouseClicked}>
          <TextField
            label='Nombre'
            variant='outlined'
            color='primary'
            fullWidth
            required
            value={name}
            onChange={onNameChanged}
            error={nameError}
          />

          <Button
            type='submit'
            color='primary'
            variant='contained'
            endIcon={<KeyboardArrowRightIcon />}
          >
            Guardar
          </Button>
        </form>

      </Container>
    </Page>
  );
}
