import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import plusFill from '@iconify/icons-eva/plus-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Box,
  Grid,
  Card,
  Button,
  Collapse,
  TextField,
  IconButton,
  Typography
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

AccountBillingPaymentMethod.propTypes = {
  formik: PropTypes.object,
  cards: PropTypes.array,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onCancel: PropTypes.func,
  sx: PropTypes.object
};

export default function AccountBillingPaymentMethod({
  formik,
  cards,
  isOpen,
  onOpen,
  onCancel,
  ...sx
}) {
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card
      sx={{
        p: 3,
        '&:not(:last-child)': { mb: 3 },
        ...sx
      }}
    >
      <Typography
        variant="overline"
        sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
      >
        Payment Method
      </Typography>

      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid key={card.id} item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                padding: 3,
                borderRadius: 1,
                border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
              }}
            >
              <Box
                component="img"
                alt="icon"
                src={
                  card.cardType === 'master_card'
                    ? '/static/icons/ic_mastercard.svg'
                    : '/static/icons/ic_visa.svg'
                }
                sx={{ mb: 1 }}
              />
              <Typography variant="subtitle2">{card.cardNumber}</Typography>
              <IconButton
                sx={{
                  top: 8,
                  right: 8,
                  position: 'absolute'
                }}
              >
                <Icon icon={moreVerticalFill} width={20} height={20} />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Button
          size="small"
          startIcon={<Icon icon={plusFill} />}
          onClick={onOpen}
        >
          Add new card
        </Button>
      </Box>

      <Collapse in={isOpen}>
        <Box
          sx={{
            padding: 3,
            marginTop: 3,
            borderRadius: 1,
            bgcolor: 'background.neutral'
          }}
        >
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Typography variant="subtitle1" paragraph>
                Add new card
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="Name on card"
                    {...getFieldProps('cardName')}
                    error={Boolean(touched.cardName && errors.cardName)}
                    helperText={touched.cardName && errors.cardName}
                  />
                </Grid>

                <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="Card number"
                    {...getFieldProps('cardNumber')}
                    error={Boolean(touched.cardNumber && errors.cardNumber)}
                    helperText={touched.cardNumber && errors.cardNumber}
                  />
                </Grid>

                <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="Expiration date"
                    placeholder="MM/YY"
                    {...getFieldProps('cardExpired')}
                    error={Boolean(touched.cardExpired && errors.cardExpired)}
                    helperText={touched.cardExpired && errors.cardExpired}
                  />
                </Grid>

                <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="Cvv"
                    {...getFieldProps('cardCvv')}
                    error={Boolean(touched.cardCvv && errors.cardCvv)}
                    helperText={touched.cardCvv && errors.cardCvv}
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <Button
                  type="button"
                  color="inherit"
                  variant="outlined"
                  onClick={onCancel}
                  sx={{ mr: 1.5 }}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  pending={isSubmitting}
                >
                  Save Change
                </LoadingButton>
              </Box>
            </Form>
          </FormikProvider>
        </Box>
      </Collapse>
    </Card>
  );
}
