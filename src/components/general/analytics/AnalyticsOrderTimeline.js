import { last } from 'lodash';
import PropTypes from 'prop-types';
// material
import { Card, Typography, CardHeader, CardContent } from '@material-ui/core';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator
} from '@material-ui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';
//
import { MTimelineDot } from '../../@material-extend';

OrderItem.propTypes = {
  item: PropTypes.object,
  lastItem: PropTypes.object
};

function OrderItem({ item, lastItem }) {
  const { title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <MTimelineDot
          color='primary'
        />
        {lastItem === item ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant='subtitle2'>{title}</Typography>
        <Typography variant='caption' sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

AnalyticsOrderTimeline.propTypes = {
  timelines: PropTypes.array,
  title: PropTypes.string
};

export default function AnalyticsOrderTimeline({ timelines, title = 'Order Timeline' }) {
  const lastItem = last(timelines);


  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title={title} />
      <CardContent>
        <Timeline align='left' style={{ alignItems: 'flex-start', padding: 0 }}>
          {timelines.map((item) => (
            <OrderItem key={item.time} item={item} lastItem={lastItem} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
