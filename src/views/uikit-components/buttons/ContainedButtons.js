// material
import AlarmIcon from '@material-ui/icons/Alarm';
import { Grid, Button } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// components
import { MButton } from '../../../components/@material-extend';
import Block from '../../../components/Block';

// ----------------------------------------------------------------------

export default function ContainedButtons() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Block title="Base">
          <Button variant="contained" color="inherit">
            Default
          </Button>
          <Button variant="contained">Primary</Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
          <Button variant="contained">Link</Button>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Adding Colors">
          <MButton variant="contained" color="inherit">
            Default
          </MButton>
          <MButton variant="contained">Primary</MButton>
          <MButton variant="contained" color="info">
            Info
          </MButton>
          <MButton variant="contained" color="success">
            Success
          </MButton>
          <MButton variant="contained" color="warning">
            Warning
          </MButton>
          <MButton variant="contained" color="error">
            Error
          </MButton>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="With Icon & Loading">
          <MButton variant="contained" color="error" startIcon={<AlarmIcon />}>
            Icon Left
          </MButton>
          <MButton variant="contained" color="error" endIcon={<AlarmIcon />}>
            Icon Right
          </MButton>
          <LoadingButton
            pending
            variant="contained"
            pendingPosition="start"
            startIcon={<AlarmIcon />}
          >
            Save
          </LoadingButton>
          <LoadingButton
            pending
            variant="contained"
            pendingPosition="end"
            endIcon={<AlarmIcon />}
          >
            Save
          </LoadingButton>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Size">
          <MButton variant="contained" color="info" size="small">
            Small
          </MButton>
          <MButton variant="contained" color="info">
            Medium
          </MButton>
          <MButton variant="contained" color="info" size="large">
            Large
          </MButton>
        </Block>
      </Grid>
    </Grid>
  );
}
