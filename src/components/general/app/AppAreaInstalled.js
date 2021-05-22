import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  { name: 'Asia', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
  { name: 'America', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] }
];

export default function AppAreaInstalled() {
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep'
      ]
    }
  });

  return (
    <Card>
      <CardHeader title="Area Installed" subheader="(+43%) than last year" />
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={CHART_DATA}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
