import { useQuery } from 'react-query';
import { Container, Grid } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  EcommerceWelcome,
  EcommerceNewProducts,
  EcommerceProductSold,
  EcommerceBestSalesman,
  EcommerceSalesUnPaid,
  EcommerceTotalSold,
  EcommerceLatestProductsSold
} from '../components/general/ecommerce';
import { AnalyticsOrderTimeline } from '../components/general/analytics';
import apiDashboard from '../services/api/dashboard/apiDashboard';
import EcommerceYearlySales from '../components/general/ecommerce/EcommerceYearlySales';
import LoadingScreen from '../components/LoadingScreen';



// ----------------------------------------------------------------------

export default function GeneralEcommerce() {

  const { data, isLoading } = useQuery('dashboard', apiDashboard.getAll);


  return (
    <Page title='General: Dashboard | Minimal-UI'>
      <Container maxWidth='xl'>

        {isLoading ?
          (
            <LoadingScreen />
          )
          :
          (<Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <EcommerceWelcome />
              </Grid>

              <Grid item xs={12} md={4}>
                <EcommerceNewProducts
                  products={data.purchases.new_products}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <EcommerceProductSold
                  total_sold={data.sales.total_products} EcommerceYearlySales
                  percent={data.sales.percent_products}
                  chart_data={[{ data: data.sales.total_products_per_day }]}
                  labels={data.sales.days}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <EcommerceTotalSold
                  total_sold={data.sales.total_sold}
                  percent={data.sales.percent_sold}
                  chart_data={[{ data: data.sales.total_sold_per_day }]}
                  labels={data.sales.days}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <EcommerceSalesUnPaid
                  total_sold={data.sales.total_credit}
                  percent={data.sales.percent_credit}
                  chart_data={[{ data: data.sales.total_credit_yesterday }]}
                  labels={data.sales.days}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={8}>
                <EcommerceYearlySales
                  chart_data={
                    [
                      { name: 'Total Ventas', data: data.sales.sales_per_year.sales_per_month },
                      { name: 'Total Compras', data: data.sales.sales_per_year.purchases_per_month }
                    ]
                  }
                  months={data.sales.sales_per_year.months}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <AnalyticsOrderTimeline
                  title='Pedidos recibidos'
                  timelines={data.purchases.latest_purchases}
                />
              </Grid>


              <Grid item xs={12} md={6} lg={8}>
                <EcommerceBestSalesman
                  sales={data.sales.latest_sales}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <EcommerceLatestProductsSold
                  products={data.sales.latest_products_sold}
                />
              </Grid>
            </Grid>
          )
        }


      </Container>
    </Page>
  );
}
