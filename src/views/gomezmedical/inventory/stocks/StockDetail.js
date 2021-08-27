import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';
import {
  Box,
  Card, Container, Divider, Grid,
  Typography
} from '@material-ui/core';
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import Label from '../../../../components/Label';
import apiStocks from '../../../../services/api/inventory/apiStocks';
import LoadingScreen from '../../../../components/LoadingScreen';
import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import { PATH_APP } from '../../../../routes/paths';
import InventoryProductCarousel from '../InventoryProductCarousel';
import { fCurrency } from '../../../../utils/formatNumber';
import { MButton } from '../../../../components/@material-extend';


const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));


StockDetail.propTypes = {
  productId: PropTypes.number
};


export default function StockDetail() {


  const { id } = useParams();
  const theme = useTheme();
  const history = useHistory();
  const { data: product, isLoading } = useQuery(['stock', id],
    () => apiStocks.getSingle(id)
  );

  const goBack = () => {
    history.push(PATH_APP.inventory.root);
  };
  return (
    <Page title='Stock: Detalle Producto | Minimal-UI'>
      <Container>
        <HeaderDashboard
          heading='Detalle Producto'
          links={[
            { name: 'Stocks', href: PATH_APP.inventory.root },

            { name: sentenceCase(product?.name ? product.name : '') }
          ]}
        />

        {isLoading ?
          (<LoadingScreen />)
          :
          (
            <>
              <Card>
                <Grid container>
                  <Grid item xs={12} md={6} lg={7}>
                    <InventoryProductCarousel product={product} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={5}>
                    <RootStyle>
                      <Label
                        variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                        color={product.stock > 0 ? 'success' : 'error'}
                        sx={{ textTransform: 'uppercase' }}
                      >
                        {product.stock > 0 ? 'Disponible' : 'Sin stock'}

                      </Label>
                      <Typography
                        variant='h4'
                        color='success'
                        sx={{
                          display: 'block'
                        }}
                      >
                        {product.stock}
                      </Typography>
                      <Typography variant='h5' paragraph>
                        {product.name}
                      </Typography>

                      <Typography variant='h4' sx={{ mb: 3 }}>
                        &nbsp;{fCurrency(product.price?.value)}
                      </Typography>

                      <Divider />
                      <Grid container sx={{ py: 3 }}>
                        <Grid item xs={4} sx={{ textAlign: 'center' }}>
                          <Typography
                            variant='caption'
                            sx={{ mb: 0.5, color: 'text.secondary', display: 'block' }}
                          >
                            Ubicacion
                          </Typography>
                          <Typography variant='subtitle1'>{(product.bin)}</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'center' }}>
                          <Typography
                            variant='caption'
                            sx={{ mb: 0.5, color: 'text.secondary', display: 'block' }}
                          >
                            Lote
                          </Typography>
                          <Typography variant='subtitle1'>{(product.batch)}</Typography>
                        </Grid>
                        <Grid item xs={4} sx={{ textAlign: 'center' }}>
                          <Typography
                            variant='caption'
                            sx={{ mb: 0.5, color: 'text.secondary', display: 'block' }}
                          >
                            Fecha Vencimiento
                          </Typography>
                          <Typography variant='subtitle1'>{(product.best_before)}</Typography>
                        </Grid>
                      </Grid>
                      <Divider />

                      <Box
                        sx={{
                          my: 3,
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant='subtitle1' sx={{ mt: 0.5 }}>
                          Categoria
                        </Typography>
                        {product.category}
                      </Box>
                      <Box
                        sx={{
                          my: 3,
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant='subtitle1' sx={{ mt: 0.5 }}>
                          SubCategoria
                        </Typography>
                        {product.subcategory}
                      </Box>
                      <Box
                        sx={{
                          my: 3,
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant='subtitle1' sx={{ mt: 0.5 }}>
                          Color
                        </Typography>
                        {product.color}
                      </Box>

                      <Box
                        sx={{
                          mb: 3,
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Typography variant='subtitle1' sx={{ mt: 0.5 }}>
                          Tamaño
                        </Typography>
                        {product.size}
                      </Box>
                      <Divider />
                      <Box sx={{ mt: 5 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12}>
                            <MButton
                              fullWidth
                              size='large'
                              type='button'
                              color='warning'
                              variant='contained'
                              onClick={goBack}
                              sx={{ whiteSpace: 'nowrap' }}
                            >
                              Regresar
                            </MButton>
                          </Grid>
                        </Grid>
                      </Box>
                    </RootStyle>
                  </Grid>
                </Grid>
              </Card>
            </>
          )

        }
      </Container>
    </Page>


  )
    ;
}
