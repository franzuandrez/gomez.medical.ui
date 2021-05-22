import faker from 'faker';
import { sample } from 'lodash';
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
import { mockImgProduct } from '../../../utils/mockImages';
//
import Scrollbar from '../../Scrollbar';
import ColorPreview from '../../ColorPreview';

// ----------------------------------------------------------------------

const PRODUCTS = [...Array(5)].map((_, index) => {
  const setIndex = index + 12;
  return {
    name: faker.commerce.productName(),
    image: mockImgProduct(setIndex),
    price: faker.datatype.number({ min: 4, max: 49, precision: 0.1 }),
    priceSale: sample([
      0,
      faker.datatype.number({ min: 49, max: 99, precision: 0.1 })
    ]),
    colors: (index === 1 && [faker.vehicle.color(), faker.vehicle.color()]) ||
      (index === 2 && [
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color()
      ]) || [
        faker.internet.color(),
        faker.internet.color(),
        faker.internet.color(),
        faker.internet.color()
      ]
  };
});

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
  const { name, image, price, priceSale } = product;
  const hasSale = priceSale > 0;

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
        <Typography variant="subtitle2" noWrap>
          <Link component={RouterLink} to="#" color="text.primary">
            {name}
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {hasSale && (
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
            >
              {fCurrency(priceSale)}
            </Typography>
          )}
          &nbsp;
          <Typography
            variant="body2"
            sx={{ color: priceSale ? 'error.main' : 'text.secondary' }}
          >
            {fCurrency(price)}
          </Typography>
        </Box>
      </Box>

      <ColorPreview limit={3} colors={product.colors} sx={{ minWidth: 72 }} />
    </Box>
  );
}

export default function EcommerceLatestProducts() {
  return (
    <Card>
      <CardHeader title="Latest Products" />
      <CardContent>
        <Scrollbar>
          {PRODUCTS.map((product) => (
            <ProductItem key={product.name} product={product} />
          ))}
        </Scrollbar>
      </CardContent>
    </Card>
  );
}
