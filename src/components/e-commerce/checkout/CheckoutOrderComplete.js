import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import filePdfFilled from '@iconify/icons-ant-design/file-pdf-filled';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Link, Button, Divider, Typography } from '@material-ui/core';
//
import { DialogAnimate } from '../../animate';

// ----------------------------------------------------------------------

const DialogStyle = styled(DialogAnimate)(({ theme }) => ({
  '& .MuiDialog-paper': {
    margin: 0,
    [theme.breakpoints.up('md')]: {
      maxWidth: 'calc(100% - 48px)',
      maxHeight: 'calc(100% - 48px)'
    }
  }
}));

// ----------------------------------------------------------------------

CheckoutOrderComplete.propTypes = {
  isComplete: PropTypes.bool,
  onReset: PropTypes.func
};

export default function CheckoutOrderComplete({ isComplete, onReset }) {
  return (
    <DialogStyle fullScreen open={isComplete}>
      <Box sx={{ p: 4, maxWidth: 480, margin: 'auto' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" paragraph>
            Thank you for your purchase!
          </Typography>

          <Box
            component="img"
            alt="successful purchase"
            src="/static/illustrations/illustration_order_complete.svg"
            sx={{ height: 240, my: 10, mx: 'auto' }}
          />

          <Typography align="left" paragraph>
            Thanks for placing order &nbsp;
            <Link href="#">01dc1370-3df6-11eb-b378-0242ac130002</Link>
          </Typography>

          <Typography align="left" sx={{ color: 'text.secondary' }}>
            We will send you a notification within 5 days when it ships.
            <br /> <br /> If you have any question or queries then fell to get
            in contact us. <br /> <br /> All the best,
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            color="inherit"
            onClick={onReset}
            startIcon={<Icon icon={arrowIosBackFill} />}
          >
            Continue Shopping
          </Button>
          <Button
            variant="contained"
            startIcon={<Icon icon={filePdfFilled} />}
            onClick={onReset}
          >
            Download as PDF
          </Button>
        </Box>
      </Box>
    </DialogStyle>
  );
}
