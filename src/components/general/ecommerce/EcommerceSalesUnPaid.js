import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import {
  alpha,
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';
// utils
import { fNumber, fPercent } from '../../../utils/formatNumber';




const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.16)
}));

// ----------------------------------------------------------------------

EcommerceSalesUnPaid.propTypes = {
  total_sold: PropTypes.number,
  percent: PropTypes.number
};

export default function EcommerceSalesUnPaid({ total_sold, percent }) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          Total en Credito
        </Typography>
        <Typography variant="h3" gutterBottom>
          {fNumber(total_sold)}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <IconWrapperStyle
            sx={{
              ...(percent < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16)
              })
            }}
          >
            <Icon
              width={16}
              height={16}
              icon={percent >= 0 ? trendingUpFill : trendingDownFill}
            />
          </IconWrapperStyle>
          <Typography variant="subtitle2" component="span">
            {percent > 0 && '+'}
            {fPercent(percent)}
          </Typography>
          <Typography
            variant="body2"
            component="span"
            sx={{ color: 'text.secondary' }}
          >
            &nbsp;que ayer
          </Typography>
        </Box>
      </Box>


    </Card>
  );
}
