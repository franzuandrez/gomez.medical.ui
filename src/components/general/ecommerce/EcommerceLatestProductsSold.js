
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Link,
  Card,
  CardHeader,
  Typography,
  CardContent
} from '@material-ui/core';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import Scrollbar from '../../Scrollbar';



const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

ProductItem.propTypes = {
  product: PropTypes.object.isRequired
};

function ProductItem({ product }) {
  const { name, image, unit_price } = product;


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '&:not(:first-child)': { mt: 3 }
      }}
    >
      <ThumbImgStyle alt={name} src={image} />
      <Box sx={{ flexGrow: 1, minWidth: 200, mx: 2 }}>
        <Typography variant='subtitle2' noWrap>
          <Link component={RouterLink} to='#' color='text.primary'>
            {name}
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          &nbsp;
          <Typography
            variant='body2'
            sx={{ color: 'text.secondary' }}
          >
            {fCurrency(unit_price)}
          </Typography>
        </Box>
      </Box>

    </Box>
  );
}

EcommerceLatestProductsSold.propTypes = {
  products: PropTypes.array
};

export default function EcommerceLatestProductsSold({ products }) {
  return (
    <Card>
      <CardHeader title='Últimos productos Vendidos' />
      <CardContent>
        <Scrollbar>
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Scrollbar>
      </CardContent>
    </Card>
  );
}
