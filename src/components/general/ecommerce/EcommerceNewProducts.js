import Slider from 'react-slick';
import PropTypes from 'prop-types';
// material
import {
  alpha,
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Box, Card,  CardContent, Typography } from '@material-ui/core';

import { CarouselControlsPaging1 } from '../../carousel';

// ----------------------------------------------------------------------


const CarouselImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  height: 280,
  objectFit: 'cover',
  [theme.breakpoints.up('xl')]: {
    height: 320
  }
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object
};

function CarouselItem({ item }) {
  const { image, name } = item;

  return (
    <Box sx={{ position: 'relative' }}>
      <CarouselImgStyle alt={name} src={image} />
      <Box
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
        }}
      />
      <CardContent
        sx={{
          left: 0,
          bottom: 0,
          maxWidth: '80%',
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white'
        }}
      >
        <Typography variant='overline' sx={{ opacity: 0.48 }}>
          Nuevo
        </Typography>
        <Typography noWrap variant='h5' sx={{ mt: 1, mb: 3 }}>
          {name}
        </Typography>

      </CardContent>
    </Box>
  );
}


EcommerceLatestProducts.propTypes = {
  products: PropTypes.array
};
export default function EcommerceLatestProducts({ products }) {
  const theme = useTheme();

  const settings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselControlsPaging1({ color: 'primary.main' })
  };

  return (
    <Card>
      <Slider {...settings}>
        {products.map((item) => (
          <CarouselItem key={item.name} item={item} />
        ))}
      </Slider>
    </Card>
  );
}
