import { useState } from 'react';
import isWeekend from 'date-fns/isWeekend';
// material
import { TextField, Grid } from '@material-ui/core';
import {
  DatePicker,
  StaticDatePicker,
  MobileDatePicker,
  DesktopDatePicker
} from '@material-ui/lab';
// components
import Block from '../../../components/Block';

// ----------------------------------------------------------------------

export default function PickerDate() {
  const [value, setValue] = useState(new Date());

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Block title="Basic">
          <DesktopDatePicker
            label="For desktop"
            value={value}
            minDate={new Date('2017-01-01')}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
          <MobileDatePicker
            label="For mobile"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Views playground">
          <DatePicker
            views={['year']}
            label="Year only"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                margin="normal"
                helperText={null}
              />
            )}
          />
          <DatePicker
            views={['year', 'month']}
            label="Year and Month"
            minDate={new Date('2012-03-01')}
            maxDate={new Date('2023-06-01')}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                margin="normal"
                helperText={null}
              />
            )}
          />
          <DatePicker
            openTo="year"
            views={['year', 'month', 'date']}
            label="Year, month and date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                margin="normal"
                helperText={null}
              />
            )}
          />
          <DatePicker
            views={['date', 'month', 'year']}
            label="Invert the order of views"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                margin="normal"
                helperText={null}
              />
            )}
          />
          <DatePicker
            views={['date']}
            label="Just date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                margin="normal"
                helperText={null}
              />
            )}
          />
        </Block>
      </Grid>

      <Grid item xs={12}>
        <Block title="Static mode">
          <StaticDatePicker
            orientation="landscape"
            openTo="date"
            value={value}
            shouldDisableDate={isWeekend}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Block>
      </Grid>
    </Grid>
  );
}
