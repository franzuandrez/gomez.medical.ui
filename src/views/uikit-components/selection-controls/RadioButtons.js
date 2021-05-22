import { useState } from 'react';
// material
import {
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel
} from '@material-ui/core';
// components
import Block from '../../../components/Block';
import { MRadio } from '../../../components/@material-extend';

// ----------------------------------------------------------------------

export default function RadioButtons() {
  const [value, setValue] = useState('a');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Block title="Basic">
              <FormControl component="fieldset">
                <RadioGroup row defaultValue="nn">
                  <Radio value="nn" />
                  <Radio value="gg" />
                  <Radio disabled value="hh" />
                </RadioGroup>
              </FormControl>
            </Block>
          </Grid>

          <Grid item xs={12}>
            <Block title="Size">
              <RadioGroup row defaultValue="g">
                <FormControlLabel
                  value="g"
                  control={<Radio />}
                  label="Normal"
                />
                <FormControlLabel
                  value="p"
                  control={<Radio size="small" />}
                  label="Small"
                />
              </RadioGroup>
            </Block>
          </Grid>

          <Grid item xs={12}>
            <Block title="Placement">
              <FormControl component="fieldset">
                <RadioGroup row defaultValue="top">
                  <FormControlLabel
                    value="top"
                    label="Top"
                    labelPlacement="top"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="start"
                    label="Start"
                    labelPlacement="start"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="bottom"
                    label="Bottom"
                    labelPlacement="bottom"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="end"
                    label="End"
                    control={<Radio />}
                  />
                </RadioGroup>
              </FormControl>
            </Block>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Adding Colors">
          <FormControl component="fieldset">
            <RadioGroup value={value} onChange={handleChange}>
              <FormControlLabel
                value="a"
                control={<Radio color="default" />}
                label="Default"
              />
              <FormControlLabel
                value="bb"
                control={<Radio />}
                label="Primary"
              />
              <FormControlLabel
                value="cc"
                control={<MRadio color="info" />}
                label="Info"
              />
              <FormControlLabel
                value="dd"
                control={<MRadio color="success" />}
                label="Success"
              />
              <FormControlLabel
                value="ee"
                control={<MRadio color="warning" />}
                label="Warning"
              />
              <FormControlLabel
                value="ff"
                control={<MRadio color="error" />}
                label="Error"
              />
              <FormControlLabel
                disabled
                value="gg"
                control={<MRadio color="error" />}
                label="Disabled"
              />
            </RadioGroup>
          </FormControl>
        </Block>
      </Grid>
    </Grid>
  );
}
