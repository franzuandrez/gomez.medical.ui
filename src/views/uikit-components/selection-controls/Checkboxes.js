import { useState } from 'react';
import { Icon } from '@iconify/react';
import awardFill from '@iconify/icons-eva/award-fill';
// material
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import {
  Grid,
  FormGroup,
  Checkbox,
  FormControl,
  FormControlLabel
} from '@material-ui/core';
// components
import Block from '../../../components/Block';
import { MCheckbox } from '../../../components/@material-extend';

// ----------------------------------------------------------------------

export default function Checkboxes() {
  const [checked, setChecked] = useState([true, false]);

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Block title="Basic">
              <Checkbox />
              <Checkbox defaultChecked />
              <Checkbox defaultChecked indeterminate />
              <Checkbox disabled />
              <Checkbox disabled defaultChecked />
              <Checkbox disabled indeterminate />
            </Block>
          </Grid>

          <Grid item xs={12}>
            <Block title="Size & Custom Icon">
              <FormControlLabel
                label="Normal"
                control={<Checkbox defaultChecked />}
              />
              <FormControlLabel
                label="Small"
                control={<Checkbox defaultChecked size="small" />}
              />
              <FormControlLabel
                control={
                  <MCheckbox
                    color="info"
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                }
                label="Custom icon"
              />
              <FormControlLabel
                control={
                  <MCheckbox
                    size="small"
                    color="error"
                    icon={<Icon icon={awardFill} />}
                    checkedIcon={<Icon icon={awardFill} />}
                  />
                }
                label="Custom icon"
              />
            </Block>
          </Grid>

          <Grid item xs={12}>
            <Block title="Placement">
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="top"
                    label="Top"
                    labelPlacement="top"
                    control={<Checkbox />}
                  />
                  <FormControlLabel
                    value="start"
                    label="Start"
                    labelPlacement="start"
                    control={<Checkbox />}
                  />
                  <FormControlLabel
                    value="bottom"
                    label="Bottom"
                    labelPlacement="bottom"
                    control={<Checkbox />}
                  />
                  <FormControlLabel
                    value="end"
                    label="End"
                    labelPlacement="end"
                    control={<Checkbox />}
                  />
                </FormGroup>
              </FormControl>
            </Block>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={6}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Block title="Adding Colors">
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked color="default" />}
                      label="Default"
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Primary"
                    />
                    <FormControlLabel
                      control={<MCheckbox defaultChecked color="info" />}
                      label="Info"
                    />
                    <FormControlLabel
                      control={<MCheckbox defaultChecked color="success" />}
                      label="Success"
                    />
                    <FormControlLabel
                      control={<MCheckbox defaultChecked color="warning" />}
                      label="Warning"
                    />
                    <FormControlLabel
                      control={<MCheckbox defaultChecked color="error" />}
                      label="Error"
                    />
                    <FormControlLabel
                      disabled
                      control={<MCheckbox defaultChecked color="error" />}
                      label="Disabled"
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl component="fieldset">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            defaultChecked
                            indeterminate
                            color="default"
                          />
                        }
                        label="Default"
                      />
                      <FormControlLabel
                        control={<Checkbox defaultChecked indeterminate />}
                        label="Primary"
                      />
                      <FormControlLabel
                        control={
                          <MCheckbox
                            defaultChecked
                            indeterminate
                            color="info"
                          />
                        }
                        label="Info"
                      />
                      <FormControlLabel
                        control={
                          <MCheckbox
                            defaultChecked
                            indeterminate
                            color="success"
                          />
                        }
                        label="Success"
                      />
                      <FormControlLabel
                        control={
                          <MCheckbox
                            defaultChecked
                            indeterminate
                            color="warning"
                          />
                        }
                        label="Warning"
                      />
                      <FormControlLabel
                        control={
                          <MCheckbox
                            defaultChecked
                            indeterminate
                            color="error"
                          />
                        }
                        label="Error"
                      />
                      <FormControlLabel
                        disabled
                        control={
                          <MCheckbox
                            defaultChecked
                            indeterminate
                            color="error"
                          />
                        }
                        label="Disabled"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Block>
          </Grid>

          <Grid item xs={12}>
            <Block title="Indeterminate">
              <div>
                <FormControlLabel
                  label="Parent"
                  control={
                    <Checkbox
                      checked={checked[0] && checked[1]}
                      indeterminate={checked[0] !== checked[1]}
                      onChange={handleChange1}
                    />
                  }
                />
                <div>
                  <FormControlLabel
                    label="Child 1"
                    control={
                      <Checkbox checked={checked[0]} onChange={handleChange2} />
                    }
                  />
                  <FormControlLabel
                    label="Child 2"
                    control={
                      <Checkbox checked={checked[1]} onChange={handleChange3} />
                    }
                  />
                </div>
              </div>
            </Block>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
