import { useState } from 'react';
// material
import { Box, TextField, Typography, Grid } from '@material-ui/core';
import {
  DateRangePicker,
  MobileDateRangePicker,
  DesktopDateRangePicker,
  StaticDateRangePicker
} from '@material-ui/lab';
// components
import Block from '../../../components/Block';

// ----------------------------------------------------------------------

export default function PickerDateRange() {
  const [value, setValue] = useState([null, null]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Block title="Basic">
          <DateRangePicker
            startText="Check-in"
            endText="Check-out"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}>to</Box>
                <TextField {...endProps} />
              </>
            )}
          />
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Responsiveness">
          <MobileDateRangePicker
            startText="Mobile start"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}>to</Box>
                <TextField {...endProps} />
              </>
            )}
          />
          <DesktopDateRangePicker
            startText="Desktop start"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} />
                <Box sx={{ mx: 2 }}>to</Box>
                <TextField {...endProps} />
              </>
            )}
          />
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Different number of months">
          <Grid container direction="column">
            <Typography gutterBottom> 1 calendar </Typography>
            <DateRangePicker
              calendars={1}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}>to</Box>
                  <TextField {...endProps} />
                </>
              )}
            />
            <Typography gutterBottom> 2 calendars</Typography>
            <DateRangePicker
              calendars={2}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}>to</Box>
                  <TextField {...endProps} />
                </>
              )}
            />
            <Typography gutterBottom> 3 calendars</Typography>
            <DateRangePicker
              calendars={3}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}>to</Box>
                  <TextField {...endProps} />
                </>
              )}
            />
          </Grid>
        </Block>
      </Grid>

      <Grid item xs={12}>
        <Block title="Static mode">
          <StaticDateRangePicker
            displayStaticWrapperAs="desktop"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} variant="standard" />
                <Box sx={{ mx: 2 }}>to</Box>
                <TextField {...endProps} variant="standard" />
              </>
            )}
          />
        </Block>
      </Grid>
    </Grid>
  );
}
