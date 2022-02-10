import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  Box,
  Card, CardContent, CardHeader,
  Container, LinearProgress, Typography,Grid
} from '@material-ui/core';
import codeIcon from '@iconify/icons-ic/sharp-barcode';
import skuIcon from '@iconify/icons-ic/outline-barcode';
import colorIcon from '@iconify/icons-ic/colorize';
import categoryIcon from '@iconify/icons-ic/round-category';
import subcategoryIcon from '@iconify/icons-ic/outline-category';
import sizeIcon from '@iconify/icons-ic/format-size';
import weightIcon from '@iconify/icons-ic/baseline-line-weight';
import branIcon from '@iconify/icons-ic/baseline-tag';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import { PATH_APP } from '../../../../routes/paths';
import apiProducts from '../../../../services/api/ecommerce/apiProducts';


const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

export default function ProductShowDetails() {


  const { productId } = useParams();
  const [product, setProduct] = useState(null);


  const { status: productStatus, isFetching } = useQuery(['product_show', productId],
    async () => {
      const response = await apiProducts.getSingle(productId);
      setProduct(response);
    }
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });


  return (
    <Page title='Producto: Ver Detalles | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Ver  Producto'
          links={[
            { name: 'Productos', href: PATH_APP.products.products.root },
            { name: 'Ver' }
          ]}

        />


        {productStatus === 'loading' && <LinearProgress />}
        {(!isFetching) &&
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3 }}>
              <CardHeader title={product.name} />
              <CardContent>
                <Typography variant='body2'>{product.description_formatted}</Typography>
                {product.code &&
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <IconStyle icon={codeIcon} />
                  <Typography variant='body2'>
                    {product.code}
                  </Typography>
                </Box>}
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <IconStyle icon={skuIcon} />
                  <Typography variant='body2'>
                    {product.sku}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <IconStyle icon={categoryIcon} />
                  <Typography variant='body2'>
                    {product.subcategory?.category?.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <IconStyle icon={subcategoryIcon} />
                  <Typography variant='body2'>
                    {product.subcategory?.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <IconStyle icon={colorIcon} />
                  <Typography variant='body2'>{product.color}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mt: 2 }}>
                  <IconStyle icon={sizeIcon} />
                  <Typography
                    variant='body2'>{product.size}{product.size_unit_measure_code !== '01' && product.sizeMeasure?.name}</Typography>
                </Box>
                {product.weight > 0 &&
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <IconStyle icon={weightIcon} />
                  <Typography
                    variant='body2'>{product.weight} {product.weight_unit_measure_code !== '01' && product.weightMeasure?.name}</Typography>
                </Box>
                }
                <Box sx={{ display: 'flex', mt: 2 }}>
                  <IconStyle icon={branIcon} />
                  <Typography variant='body2'>{product.brand?.name}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        }

      </Container>
    </Page>
  );

};
