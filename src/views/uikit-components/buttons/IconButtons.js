// material
import AlarmIcon from '@material-ui/icons/Alarm';
import { Grid, IconButton } from '@material-ui/core';
// components
import Block from '../../../components/Block';
import { MIconButton } from '../../../components/@material-extend';

// ----------------------------------------------------------------------

export default function IconButtons() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Block title="Base">
          <IconButton color="inherit">
            <AlarmIcon />
          </IconButton>
          <IconButton>
            <AlarmIcon />
          </IconButton>
          <IconButton color="primary">
            <AlarmIcon />
          </IconButton>
          <IconButton disabled>
            <AlarmIcon />
          </IconButton>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Adding Colors">
          <MIconButton color="inherit">
            <AlarmIcon />
          </MIconButton>
          <MIconButton>
            <AlarmIcon />
          </MIconButton>
          <MIconButton color="primary">
            <AlarmIcon />
          </MIconButton>
          <MIconButton color="info">
            <AlarmIcon />
          </MIconButton>
          <MIconButton color="success">
            <AlarmIcon />
          </MIconButton>
          <MIconButton color="warning">
            <AlarmIcon />
          </MIconButton>
          <MIconButton color="error">
            <AlarmIcon />
          </MIconButton>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Size">
          <MIconButton size="small" color="info">
            <AlarmIcon fontSize="inherit" />
          </MIconButton>
          <MIconButton color="info">
            <AlarmIcon fontSize="small" />
          </MIconButton>
          <MIconButton color="info">
            <AlarmIcon />
          </MIconButton>
          <MIconButton color="info">
            <AlarmIcon fontSize="large" />
          </MIconButton>
        </Block>
      </Grid>
    </Grid>
  );
}
