// material
import {
  Grid,
  Switch,
  FormGroup,
  FormControl,
  FormControlLabel
} from '@material-ui/core';
// components
import Block from '../../../components/Block';
import { MSwitch } from '../../../components/@material-extend';

// ----------------------------------------------------------------------

export default function Switches() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Block title="Basic">
              <Switch defaultChecked />
              <Switch />
              <Switch disabled />
              <Switch disabled checked />
              <Switch defaultChecked color="default" />
            </Block>
          </Grid>

          <Grid item xs={12}>
            <Block title="Sizes">
              <FormControlLabel
                control={<Switch size="small" />}
                label="Small"
              />
              <FormControlLabel control={<Switch />} label="Normal" />
            </Block>
          </Grid>

          <Grid item xs={12}>
            <Block title="Placement">
              <FormControl component="fieldset">
                <FormGroup row>
                  <FormControlLabel
                    value="top"
                    label="Top"
                    labelPlacement="top"
                    control={<Switch />}
                  />
                  <FormControlLabel
                    value="start"
                    label="Start"
                    labelPlacement="start"
                    control={<Switch />}
                  />
                  <FormControlLabel
                    value="bottom"
                    label="Bottom"
                    labelPlacement="bottom"
                    control={<Switch />}
                  />
                  <FormControlLabel
                    value="end"
                    label="End"
                    labelPlacement="end"
                    control={<Switch />}
                  />
                </FormGroup>
              </FormControl>
            </Block>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Adding Colors">
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={<Switch defaultChecked color="default" />}
                label="Default"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Primary"
              />
              <FormControlLabel
                control={<MSwitch defaultChecked color="info" />}
                label="Info"
              />
              <FormControlLabel
                control={<MSwitch defaultChecked color="success" />}
                label="Success"
              />
              <FormControlLabel
                control={<MSwitch defaultChecked color="warning" />}
                label="Warning"
              />
              <FormControlLabel
                control={<MSwitch defaultChecked color="error" />}
                label="Error"
              />
              <FormControlLabel
                disabled
                control={<MSwitch defaultChecked color="error" />}
                label="Disabled"
              />
              <FormControlLabel
                disabled
                control={<MSwitch color="error" />}
                label="Disabled"
              />
            </FormGroup>
          </FormControl>
        </Block>
      </Grid>
    </Grid>
  );
}
