import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Link, Button, Divider, Typography } from '@material-ui/core';
import { DialogAnimate } from '../../../../components/animate';
import {PATH_APP} from '../../../../routes/paths';


const DialogStyle = styled(DialogAnimate)(({ theme }) => ({
  '& .MuiDialog-paper': {
    margin: 0,
    [theme.breakpoints.up('md')]: {
      maxWidth: 'calc(100% - 48px)',
      maxHeight: 'calc(100% - 48px)'
    }
  }
}));



SalesCheckoutOrderComplete.propTypes = {
  isComplete: PropTypes.bool,
  onReset: PropTypes.func
};

export default function SalesCheckoutOrderComplete({ isComplete, onReset }) {

  const { order } = useSelector((state) => state.sales);


  return (
    <DialogStyle fullScreen open={isComplete}>
      <Box sx={{ p: 4, maxWidth: 480, margin: 'auto' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h4' paragraph>
            ¡Gracias por tu compra!
          </Typography>

          <Box
            component='img'
            alt='successful purchase'
            src='/static/illustrations/illustration_order_complete.svg'
            sx={{ height: 240, my: 10, mx: 'auto' }}
          />

          <Typography align='left' paragraph>
            Gracias por realizar la compra &nbsp;
            <Link href={`${PATH_APP.sales.orders.root}/${order.sales_order_number}`}>{order.sales_order_number}</Link>
          </Typography>

        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            color='inherit'
            onClick={onReset}
            startIcon={<Icon icon={arrowIosBackFill} />}
          >
            Continuar
          </Button>

        </Box>
      </Box>
    </DialogStyle>
  );
}
