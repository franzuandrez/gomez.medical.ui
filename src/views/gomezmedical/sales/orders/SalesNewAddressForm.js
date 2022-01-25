import PropTypes from 'prop-types';
import {
  Button,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { DialogAnimate } from '../../../../components/animate';
import Addresses from '../../business_entity/Addresses';

SalesNewAddressForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  customer: PropTypes.object
};

export default function SalesNewAddressForm({
                                              open,
                                              onClose,
                                              customer,
                                              openWithMinimalInformation = true
                                            }) {


  return (
    <DialogAnimate maxWidth='md' open={open} onClose={onClose}>
      <DialogContent>
        <Addresses
          businessEntity={customer?.business_entity} openWithMinimalInformation={openWithMinimalInformation}
        />
      </DialogContent>
      <DialogActions>
        <Button
          type='button'
          color='inherit'
          variant='outlined'
          onClick={onClose}
        >
          Cerrar
        </Button>
      </DialogActions>

    </DialogAnimate>
  );
}
