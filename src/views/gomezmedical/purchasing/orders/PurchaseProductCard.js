import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
// material
import { Box, Card, Typography, CardContent, TextField } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Form, FormikProvider, useField, useFormik } from 'formik';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
import { Icon } from '@iconify/react';
import minusFill from '@iconify/icons-eva/minus-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
import { MButton, MIconButton } from '../../../../components/@material-extend';
import { addCart } from '../../../../redux/slices/purchasing';


const Incrementer = (props) => {
  const [field, , helpers] = useField(props);
  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = (qty) => {

    if (qty > 1) {
      setValue(parseInt(qty, 10));
    } else {
      setValue(value + 1);
    }
  };
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032'
      }}
    >
      <MIconButton
        size='small'
        color='inherit'
        disabled={value <= 1}
        onClick={decrementQuantity}
      >
        <Icon icon={minusFill} width={16} height={16} />
      </MIconButton>
      <Typography
        variant='body2'
        component='span'
        sx={{
          width: 40,
          textAlign: 'center',
          display: 'inline-block'
        }}
      >
        <TextField
          fullWidth
          variant='standard'
          value={value}
          onChange={(e) => incrementQuantity(e.target.value)}
        />
      </Typography>
      <MIconButton
        size='small'
        color='inherit'
        onClick={incrementQuantity}
      >
        <Icon icon={plusFill} width={16} height={16} />
      </MIconButton>
    </Box>
  );
};


const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});


PurchaseProductCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  cover: PropTypes.string,
  vendor: PropTypes.object,
  cost: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.string
};

export default function PurchaseProductCard({ vendor, id, name, cover, cost, color, size, ...other }) {


  const dispatch = useDispatch();


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id,
      quantity: 0,
      name,
      cover,
      vendor,
      cost,
      color,
      size
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {

      setSubmitting(true);
      dispatch(addCart(values));
      setSubmitting(false);
      resetForm();

    }
  });
  const { handleSubmit } = formik;


  return (

    <FormikProvider value={formik}>
      <Form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Card {...other}>

          <Box sx={{ pt: '100%', position: 'relative' }}>
            <ProductImgStyle alt={name} src={cover} />
          </Box>

          <CardContent>

            <Typography variant='body2' noWrap>
              {name}
            </Typography>

            <Box

            >
              <Typography variant='subtitle1' sx={{ mt: 0.5 }}>
                Cantidad
              </Typography>
              <div>
                <Incrementer name='quantity' available />
                <MButton
                  size='medium'
                  type='submit'
                  color='warning'
                  variant='contained'
                  startIcon={<Icon icon={roundAddShoppingCart} />}
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Agregar al pedido
                </MButton>
              </div>
            </Box>
          </CardContent>
        </Card>
      </Form>
    </FormikProvider>
  );
}
