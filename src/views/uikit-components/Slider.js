import { useState } from 'react';
// material
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import {
  Box,
  Grid,
  Card,
  Slider,
  Container,
  Typography,
  CardContent
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Block from '../../components/Block';
import HeaderDashboard from '../../components/HeaderDashboard';

// ----------------------------------------------------------------------

const marks = [
  { value: 0, label: '0°C' },
  { value: 20, label: '20°C' },
  { value: 37, label: '37°C' },
  { value: 100, label: '100°C' }
];

const prices = [
  { value: 0, label: '$0' },
  { value: 25, label: '250' },
  { value: 50, label: '500' },
  { value: 75, label: '750' },
  { value: 100, label: '1000' }
];

function valuePrice(value) {
  return value > 0 ? `$${value}0` : value;
}

function valueLabelFormatPrice(value) {
  return value > 0 ? `$${value}` : value;
}

function valuetext(value) {
  return `$${value}°C`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

export default function SliderComponent() {
  const [value, setValue] = useState(30);
  const [price, setPrice] = useState([25, 75]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePrice = (event, newValue) => {
    setPrice(newValue);
  };

  return (
    <Page title="Components: Slider | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Slider"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Slider' }
          ]}
          moreLink="https://next.material-ui.com/components/slider"
        />
        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Block title="Volume">
                  <Grid container spacing={2}>
                    <Grid item>
                      <VolumeDown />
                    </Grid>
                    <Grid item xs>
                      <Slider
                        value={value}
                        onChange={handleChange}
                        aria-labelledby="continuous-slider"
                      />
                    </Grid>
                    <Grid item>
                      <VolumeUp />
                    </Grid>
                  </Grid>
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Disabled slider">
                  <Slider disabled defaultValue={30} />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Temperature">
                  <Slider
                    defaultValue={30}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={110}
                  />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Disabled">
                  <Slider
                    marks
                    min={10}
                    disabled
                    step={10}
                    max={110}
                    defaultValue={30}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                  />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Small steps">
                  <Slider
                    defaultValue={0.00000005}
                    getAriaValueText={valuetext}
                    step={0.00000001}
                    marks
                    min={-0.00000005}
                    max={0.0000001}
                    valueLabelDisplay="auto"
                  />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Custom marks">
                  <Slider
                    defaultValue={20}
                    getAriaValueText={valuetext}
                    step={10}
                    valueLabelDisplay="auto"
                    marks={marks}
                  />
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Restricted values">
                  <Slider
                    defaultValue={20}
                    valueLabelFormat={valueLabelFormat}
                    getAriaValueText={valuetext}
                    step={null}
                    valueLabelDisplay="auto"
                    marks={marks}
                  />
                </Block>
              </Grid>

              <Grid item xs={12} md={8}>
                <Block title="Range">
                  <Box sx={{ width: '100%' }}>
                    <Slider
                      scale={(x) => x * 10}
                      step={10}
                      marks={prices}
                      value={price}
                      onChange={handleChangePrice}
                      valueLabelDisplay="on"
                      getAriaValueText={valuePrice}
                      valueLabelFormat={valueLabelFormatPrice}
                    />
                  </Box>
                  <Box
                    sx={{
                      p: 2,
                      width: '100%',
                      borderRadius: 1,
                      bgcolor: 'grey.50012'
                    }}
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      Min: {valuePrice(price[0])}
                    </Typography>
                    <Typography variant="subtitle2">
                      Max: {valuePrice(price[1])}
                    </Typography>
                  </Box>
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
