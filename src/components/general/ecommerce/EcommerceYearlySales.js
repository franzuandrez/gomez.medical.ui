import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------


export default function EcommerceYearlySales({ chart_data ,months }) {

  console.log(chart_data);
  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: months
    }
  });

  return (
    <Card>
      <CardHeader title='Ventas y Compras Anuales' />
      <Box sx={{ mt: 3, mx: 3 }} dir='ltr'>
        <ReactApexChart
          type='area'
          series={chart_data}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
