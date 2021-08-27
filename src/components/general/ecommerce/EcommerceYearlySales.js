import PropTypes from 'prop-types';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------


EcommerceYearlySales.propTypes = {
  chart_data: PropTypes.array,
  months: PropTypes.array
};

export default function EcommerceYearlySales({ chart_data ,months }) {

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: 'top', horizontalAlign: 'right' },
    xaxis: {
      categories: months
    }
  });

  return (
    <Card>
      <CardHeader title='Ventas Anuales' />
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
