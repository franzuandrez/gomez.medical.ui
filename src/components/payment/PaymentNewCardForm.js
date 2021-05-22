import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import infoFill from '@iconify/icons-eva/info-fill';
// material
import {
  Grid,
  Paper,
  Button,
  Popover,
  TextField,
  Typography,
  InputAdornment
} from '@material-ui/core';
//
import { MIconButton } from '../@material-extend';

// ----------------------------------------------------------------------

PaymentNewCardForm.propTypes = {
  formik: PropTypes.object,
  onCancel: PropTypes.func
};

export default function PaymentNewCardForm({ formik, onCancel }) {
  const [isOpen, setIsOpen] = useState(null);
  const { values, resetForm, getFieldProps } = formik;

  const handleCancel = () => {
    onCancel();
    resetForm({
      values: {
        ...values,
        newCardName: '',
        newCardNumber: '',
        newCardExpired: '',
        newCardCvv: ''
      }
    });
  };

  return (
    <Paper
      sx={{
        p: 2.5,
        mb: 2.5,
        bgcolor: 'background.neutral'
      }}
    >
      <Typography variant="subtitle1" paragraph>
        Add new card
      </Typography>
      <TextField
        fullWidth
        size="small"
        label="Name on card"
        {...getFieldProps('newCardName')}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        size="small"
        label="Card number"
        {...getFieldProps('newCardNumber')}
        sx={{ mb: 2 }}
      />

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <TextField
            size="small"
            label="MM/YY"
            {...getFieldProps('newCardExpired')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            size="small"
            label="CVV"
            {...getFieldProps('newCardCvv')}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <MIconButton
                    size="small"
                    edge="end"
                    onClick={(e) => setIsOpen(e.currentTarget)}
                  >
                    <Icon icon={infoFill} />
                  </MIconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button id="cancel" type="button" fullWidth onClick={handleCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button id="create" type="button" fullWidth variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>

      <Popover
        open={Boolean(isOpen)}
        anchorEl={isOpen}
        onClose={() => setIsOpen(null)}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        PaperProps={{
          sx: {
            p: 1,
            maxWidth: 200
          }
        }}
      >
        <Typography variant="body2" align="center">
          Three-digit number on the back of your VISA card
        </Typography>
      </Popover>
    </Paper>
  );
}
