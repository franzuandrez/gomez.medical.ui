import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import downloadFill from '@iconify/icons-eva/download-fill';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Tooltip, IconButton, DialogActions } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
//
import { MButton } from '../../../../components/@material-extend';
import { DialogAnimate } from '../../../../components/animate';
import PurchaseOrderPDF from './PurchaseOrderPDF';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(5)
}));

// ----------------------------------------------------------------------

PurchaseOrderShowToolbar.propTypes = {
  purchase: PropTypes.object.isRequired
};

export default function PurchaseOrderShowToolbar({ purchase, ...other }) {
  const [openPDF, setOpenPDF] = useState(false);

  const handleOpenPreview = () => {
    setOpenPDF(true);
  };

  const handleClosePreview = () => {
    setOpenPDF(false);
  };

  return (
    <RootStyle {...other}>
      <MButton
        color="info"
        size="small"
        variant="contained"
        onClick={handleOpenPreview}
        endIcon={<Icon icon={eyeFill} />}
        sx={{ mx: 1 }}
      >
        Preview
      </MButton>

      <PDFDownloadLink
        document={<PurchaseOrderPDF purchase={purchase} />}
        fileName={`PEDIDO  -${purchase.purchase_order_id}`}
        style={{ textDecoration: 'none' }}
      >
        {({ loading }) => (
          <LoadingButton
            size="small"
            pending={loading}
            variant="contained"
            pendingPosition="end"
            endIcon={<Icon icon={downloadFill} />}
          >
            Descargar
          </LoadingButton>
        )}
      </PDFDownloadLink>

      <DialogAnimate fullScreen open={openPDF}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={handleClosePreview}>
                <Icon icon={closeFill} />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <PurchaseOrderPDF purchase={purchase} />
            </PDFViewer>
          </Box>
        </Box>
      </DialogAnimate>
    </RootStyle>
  );
}
