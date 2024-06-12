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
    customer: PropTypes.object,
    openWithMinimalInformation: PropTypes.bool,
    onAdressAdded:PropTypes.func
};

export default function SalesNewAddressForm({
                                              open,
                                              onClose,
                                              customer,
                                              openWithMinimalInformation = true,
                                              onAdressAdded

                                            }) {


  return (
    <DialogAnimate maxWidth='md' open={open} onClose={onClose}>
      <DialogContent>
        <Addresses
          businessEntity={customer?.business_entity}
          openWithMinimalInformation={openWithMinimalInformation}
          onAdressAdded={onAdressAdded}
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
