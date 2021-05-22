// material
import AlarmIcon from '@material-ui/icons/Alarm';
import { Grid, Fab } from '@material-ui/core';
// components
import Block from '../../../components/Block';
import { MFab } from '../../../components/@material-extend';

// ----------------------------------------------------------------------

export default function FloatingActionButton() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Block title="Base">
          <Fab color="default">
            <AlarmIcon />
          </Fab>
          <Fab>
            <AlarmIcon />
          </Fab>
          <Fab disabled>
            <AlarmIcon />
          </Fab>
          <Fab color="default" variant="extended">
            <AlarmIcon />
            Default
          </Fab>
          <Fab variant="extended">
            <AlarmIcon />
            Primary
          </Fab>
          <Fab disabled variant="extended">
            <AlarmIcon />
            Disabled
          </Fab>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Adding Colors">
          <MFab color="default">
            <AlarmIcon />
          </MFab>
          <MFab>
            <AlarmIcon />
          </MFab>
          <MFab color="info">
            <AlarmIcon />
          </MFab>
          <MFab color="success">
            <AlarmIcon />
          </MFab>
          <MFab color="warning">
            <AlarmIcon />
          </MFab>
          <MFab color="error">
            <AlarmIcon />
          </MFab>

          <MFab variant="extended" color="default">
            <AlarmIcon />
            Default
          </MFab>
          <MFab variant="extended">
            <AlarmIcon />
            Primary
          </MFab>
          <MFab variant="extended" color="info">
            <AlarmIcon />
            Info
          </MFab>
          <MFab variant="extended" color="success">
            <AlarmIcon />
            Success
          </MFab>
          <MFab variant="extended" color="warning">
            <AlarmIcon />
            Warning
          </MFab>
          <MFab variant="extended" color="error">
            <AlarmIcon />
            Error
          </MFab>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Size">
          <MFab color="info" size="small">
            <AlarmIcon />
          </MFab>
          <MFab color="info" size="medium">
            <AlarmIcon />
          </MFab>
          <MFab color="info">
            <AlarmIcon />
          </MFab>
          <MFab variant="extended" size="small" color="info">
            <AlarmIcon />
            Small
          </MFab>
          <MFab variant="extended" size="medium" color="info">
            <AlarmIcon />
            Medium
          </MFab>
          <MFab variant="extended" color="info">
            <AlarmIcon />
            Large
          </MFab>
        </Block>
      </Grid>
    </Grid>
  );
}
