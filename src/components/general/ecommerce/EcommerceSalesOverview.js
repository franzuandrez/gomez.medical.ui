import faker from 'faker';
import PropTypes from 'prop-types';
// material
import {
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent
} from '@material-ui/core';
// utils
import { fPercent, fCurrency } from '../../../utils/formatNumber';
//
import { MLinearProgress } from '../../@material-extend';

// ----------------------------------------------------------------------

const SALES = [
  {
    label: 'Total Profit',
    amount: faker.finance.amount(),
    value: faker.datatype.number({ min: 9, max: 99, precision: 0.1 })
  },
  {
    label: 'Total Income',
    amount: faker.finance.amount(),
    value: faker.datatype.number({ min: 9, max: 99, precision: 0.1 })
  },
  {
    label: 'Total Expenses',
    amount: faker.finance.amount(),
    value: faker.datatype.number({ min: 9, max: 99, precision: 0.1 })
  }
];

const COLORS = ['primary', 'info', 'warning'];

// ----------------------------------------------------------------------

ProgressItem.propTypes = {
  progress: PropTypes.object,
  index: PropTypes.number
};

function ProgressItem({ progress, index }) {
  return (
    <Box
      sx={{
        mt: 4,
        '&:first-of-type': { mt: 1 }
      }}
    >
      <Box
        sx={{
          mb: 1,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Typography>

        <Typography variant="body2">{fCurrency(progress.amount)}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp;({fPercent(progress.value)})
        </Typography>
      </Box>
      <MLinearProgress
        variant="determinate"
        value={progress.value}
        color={COLORS[index]}
      />
    </Box>
  );
}

export default function EcommerceSalesOverview() {
  return (
    <Card>
      <CardHeader title="Sales Overview" />
      <CardContent>
        {SALES.map((progress, index) => (
          <ProgressItem
            key={progress.label}
            progress={progress}
            index={index}
          />
        ))}
      </CardContent>
    </Card>
  );
}
