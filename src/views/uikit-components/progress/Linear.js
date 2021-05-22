import PropTypes from 'prop-types';
// material
import { Box, Grid } from '@material-ui/core';
// components
import Block from '../../../components/Block';
import { MLinearProgress } from '../../../components/@material-extend';

// ----------------------------------------------------------------------

Linear.propTypes = {
  progress: PropTypes.number,
  buffer: PropTypes.number
};

export default function Linear({ progress, buffer }) {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Block title="Linears Indeterminate">
          <Box sx={{ width: '100%' }}>
            <MLinearProgress color="inherit" /> <br />
            <MLinearProgress /> <br />
            <MLinearProgress color="info" /> <br />
            <MLinearProgress color="success" /> <br />
            <MLinearProgress color="warning" /> <br />
            <MLinearProgress color="error" />
          </Box>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Linears Determinate">
          <Box sx={{ width: '100%' }}>
            <MLinearProgress
              color="inherit"
              variant="determinate"
              value={progress}
            />
            <br />
            <MLinearProgress variant="determinate" value={progress} />
            <br />
            <MLinearProgress
              variant="determinate"
              value={progress}
              color="info"
            />
            <br />
            <MLinearProgress
              variant="determinate"
              value={progress}
              color="success"
            />
            <br />
            <MLinearProgress
              variant="determinate"
              value={progress}
              color="warning"
            />
            <br />
            <MLinearProgress
              variant="determinate"
              value={progress}
              color="error"
            />
          </Box>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Linears Buffer">
          <Box sx={{ width: '100%' }}>
            <MLinearProgress
              variant="buffer"
              value={progress}
              valueBuffer={buffer}
              color="inherit"
            />
            <br />
            <MLinearProgress
              variant="buffer"
              value={progress}
              valueBuffer={buffer}
            />
            <br />
            <MLinearProgress
              variant="buffer"
              value={progress}
              valueBuffer={buffer}
              color="info"
            />
            <br />
            <MLinearProgress
              variant="buffer"
              value={progress}
              valueBuffer={buffer}
              color="success"
            />
            <br />
            <MLinearProgress
              variant="buffer"
              value={progress}
              valueBuffer={buffer}
              color="warning"
            />
            <br />
            <MLinearProgress
              variant="buffer"
              value={progress}
              valueBuffer={buffer}
              color="error"
            />
          </Box>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Linears Query">
          <Box sx={{ width: '100%' }}>
            <MLinearProgress
              variant="query"
              value={progress}
              valueBuffer={buffer}
              color="inherit"
            />
            <br />
            <MLinearProgress
              variant="query"
              value={progress}
              valueBuffer={buffer}
            />
            <br />
            <MLinearProgress
              variant="query"
              value={progress}
              valueBuffer={buffer}
              color="info"
            />
            <br />
            <MLinearProgress
              variant="query"
              value={progress}
              valueBuffer={buffer}
              color="success"
            />
            <br />
            <MLinearProgress
              variant="query"
              value={progress}
              valueBuffer={buffer}
              color="warning"
            />
            <br />
            <MLinearProgress
              variant="query"
              value={progress}
              valueBuffer={buffer}
              color="error"
            />
          </Box>
        </Block>
      </Grid>
    </Grid>
  );
}
