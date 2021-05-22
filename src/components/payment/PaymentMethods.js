import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Radio,
  Hidden,
  Button,
  Collapse,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';
//
import PaymentNewCardForm from './PaymentNewCardForm';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    padding: 0,
    paddingTop: theme.spacing(5)
  }
}));

const OptionStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  marginBottom: theme.spacing(1),
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

// ----------------------------------------------------------------------

PaymentMethods.propTypes = {
  paymentOptions: PropTypes.array,
  cardOptions: PropTypes.array,
  formik: PropTypes.object
};

export default function PaymentMethods({
  paymentOptions,
  cardOptions,
  formik
}) {
  const [show, setShow] = useState(false);
  const { values, getFieldProps } = formik;

  const handleCollapseIn = () => {
    setShow((prev) => !prev);
  };

  const handleCollapseOut = () => {
    setShow(false);
  };

  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        Payment Method
      </Typography>

      <RadioGroup {...getFieldProps('method')}>
        <Grid container spacing={2}>
          {paymentOptions.map((method) => {
            const { value, title, icons } = method;
            const hasChildren = value === 'credit_card';

            return (
              <Grid key={title} item xs={12}>
                <OptionStyle
                  sx={{
                    ...(values.method === value && {
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
                      <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        {title}
                      </Typography>
                    }
                    sx={{ py: 3, marginRight: 0 }}
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
                          component="img"
                          alt="logo card"
                          src={icon}
                          sx={{ '&:last-child': { ml: 1 } }}
                        />
                      ))}
                    </Box>
                  </Hidden>

                  {hasChildren && (
                    <Collapse in={values.method === 'credit_card'}>
                      <TextField
                        select
                        fullWidth
                        label="Card"
                        {...getFieldProps('card')}
                        SelectProps={{ native: true }}
                      >
                        {cardOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>

                      <Button
                        id="addNewCard"
                        type="button"
                        size="small"
                        startIcon={
                          <Icon icon={plusFill} width={20} height={20} />
                        }
                        onClick={handleCollapseIn}
                        sx={{ my: 3 }}
                      >
                        Add new card
                      </Button>

                      <Collapse in={show}>
                        <PaymentNewCardForm
                          formik={formik}
                          onCancel={handleCollapseOut}
                        />
                      </Collapse>
                    </Collapse>
                  )}
                </OptionStyle>
              </Grid>
            );
          })}
        </Grid>
      </RadioGroup>
    </RootStyle>
  );
}
