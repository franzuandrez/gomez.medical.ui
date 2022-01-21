import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Grid,
  Radio,
  Hidden,
  Collapse,
  TextField,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormHelperText,
  FormControlLabel
} from '@material-ui/core';

// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

// ----------------------------------------------------------------------

SalesCheckoutPaymentMethods.propTypes = {
  formik: PropTypes.object,
  paymentOptions: PropTypes.array
};

export default function SalesCheckoutPaymentMethods({
                                                      paymentOptions,
                                                      formik
                                                    }) {
  const { errors, touched, values, getFieldProps } = formik;

  return (
    <Card sx={{ my: 3 }}>
      <CardHeader title='Opciones de pago' />
      <CardContent>
        <RadioGroup row {...getFieldProps('payment')}>
          <Grid container spacing={2}>
            {paymentOptions.map((method) => {
              const { value, title, icons, description } = method;
              const hasChildren = value === 'cash';

              return (
                <Grid key={title} item xs={12}>
                  <OptionStyle
                    sx={{
                      ...(values.payment === value && {
                        boxShadow: (theme) => theme.customShadows.z8
                      }),
                      ...(hasChildren && { flexWrap: 'wrap' })
                    }}
                  >
                    <FormControlLabel
                      value={value}
                      control={
                        <Radio
                          checkedIcon={<Icon icon={checkmarkCircle2Fill} />}
                        />
                      }
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant='subtitle2'>{title}</Typography>
                          <Typography
                            variant='body2'
                            sx={{ color: 'text.secondary' }}
                          >
                            {description}
                          </Typography>
                        </Box>
                      }
                      sx={{ flexGrow: 1, py: 3 }}
                    />
                    <Hidden smDown>
                      <Box
                        sx={{
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        {icons.map((icon) => (
                          <Box
                            key={icon}
                            component='img'
                            alt='logo card'
                            src={icon}
                            sx={{ '&:last-child': { ml: 1 } }}
                          />
                        ))}
                      </Box>
                    </Hidden>

                    {hasChildren && (
                      <Collapse
                        in={values.payment === 'cash'}
                        sx={{ width: '100%' }}
                      >
                        <TextField
                          fullWidth
                          inputRef={input => input && input.focus()}
                          label='Cantidad'
                          sx={{ m: 2 }}
                          {...getFieldProps('amount_given')}
                        />

                      </Collapse>
                    )}
                  </OptionStyle>
                </Grid>
              );
            })}
          </Grid>
        </RadioGroup>

        {errors.payment && (
          <FormHelperText error>
            <Box component='span' sx={{ px: 2 }}>
              {touched.payment && errors.payment}
            </Box>
          </FormHelperText>
        )}
      </CardContent>
    </Card>
  );
}
