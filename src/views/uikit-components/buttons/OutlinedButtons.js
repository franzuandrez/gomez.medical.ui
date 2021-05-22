import AlarmIcon from '@material-ui/icons/Alarm';
// material
import { Grid, Button } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// components
import { MButton } from '../../../components/@material-extend';
import Block from '../../../components/Block';

// ----------------------------------------------------------------------

export default function OutlinedButtons() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Block title="Base">
          <Button variant="outlined" color="inherit">
            Default
          </Button>
          <Button variant="outlined">Primary</Button>
          <Button variant="outlined" disabled>
            Disabled
          </Button>
          <Button variant="outlined">Link</Button>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Adding Colors">
          <MButton variant="outlined" color="inherit">
            Default
          </MButton>
          <MButton variant="outlined">Primary</MButton>
          <MButton variant="outlined" color="info">
            Info
          </MButton>
          <MButton variant="outlined" color="success">
            Success
          </MButton>
          <MButton variant="outlined" color="warning">
            Warning
          </MButton>
          <MButton variant="outlined" color="error">
            Error
          </MButton>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="With Icon & Loading">
          <MButton variant="outlined" color="error" startIcon={<AlarmIcon />}>
            Icon Left
          </MButton>
          <MButton variant="outlined" color="error" endIcon={<AlarmIcon />}>
            Icon Right
          </MButton>
          <LoadingButton
            pending
            variant="outlined"
            pendingPosition="start"
            startIcon={<AlarmIcon />}
          >
            Save
          </LoadingButton>
          <LoadingButton
            pending
            variant="outlined"
            pendingPosition="end"
            endIcon={<AlarmIcon />}
          >
            Save
          </LoadingButton>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Size">
          <MButton variant="outlined" color="info" size="small">
            Small
          </MButton>
          <MButton variant="outlined" color="info">
            Medium
          </MButton>
          <MButton variant="outlined" color="info" size="large">
            Large
          </MButton>
        </Block>
      </Grid>
    </Grid>
  );
}
