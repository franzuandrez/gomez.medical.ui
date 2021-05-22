import { last, slice } from 'lodash';
// material
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import {
  Card,
  Grid,
  Paper,
  Container,
  Typography,
  CardContent
} from '@material-ui/core';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent
} from '@material-ui/lab';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Block from '../../components/Block';
import HeaderDashboard from '../../components/HeaderDashboard';
import { MTimelineDot } from '../../components/@material-extend';

// ----------------------------------------------------------------------

const TIMELINES = [
  {
    key: 1,
    title: 'Default',
    des: 'Morbi mattis ullamcorper',
    time: '09:30 am',
    icon: <FastfoodIcon />
  },
  {
    key: 2,
    title: 'Primary',
    des: 'Morbi mattis ullamcorper',
    time: '10:00 am',
    color: 'primary',
    icon: <LaptopMacIcon />
  },
  {
    key: 3,
    title: 'Info',
    des: 'Morbi mattis ullamcorper',
    time: '10:30 am',
    color: 'info',
    icon: <HotelIcon />
  },
  {
    key: 4,
    title: 'Success',
    des: 'Morbi mattis ullamcorper',
    time: '11:00 am',
    color: 'success',
    icon: <RepeatIcon />
  },
  {
    key: 5,
    title: 'Warning',
    des: 'Morbi mattis ullamcorper',
    time: '11:30 am',
    color: 'warning',
    icon: <FastfoodIcon />
  },
  {
    key: 6,
    title: 'Error',
    des: 'Morbi mattis ullamcorper',
    time: '12:00 am',
    color: 'error',
    icon: <FastfoodIcon />
  }
];

// ----------------------------------------------------------------------

export default function TimelineComponent() {
  const lastItem = last(TIMELINES).key;
  const reduceTimeLine = slice(TIMELINES, TIMELINES.length - 3);

  return (
    <Page title="Components: Timeline | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Timeline"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Timeline' }
          ]}
          moreLink="https://next.material-ui.com/components/timeline"
        />
        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Block title="Default">
                  <Timeline>
                    {reduceTimeLine.map((item) => (
                      <TimelineItem key={item.key}>
                        <TimelineSeparator>
                          <TimelineDot />
                          {lastItem === item.key ? null : <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>{item.title}</TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Right">
                  <Timeline align="right">
                    {reduceTimeLine.map((item) => (
                      <TimelineItem key={item.key}>
                        <TimelineSeparator>
                          <TimelineDot />
                          {lastItem === item.key ? null : <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>{item.title}</TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Alternating">
                  <Timeline align="alternate">
                    {reduceTimeLine.map((item) => (
                      <TimelineItem key={item.key}>
                        <TimelineSeparator>
                          <TimelineDot />
                          {lastItem === item.key ? null : <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>{item.title}</TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Filled">
                  <Timeline align="alternate">
                    {TIMELINES.map((item) => (
                      <TimelineItem key={item.key}>
                        <TimelineSeparator>
                          <MTimelineDot color={item.color} />
                          {lastItem === item.key ? null : <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>{item.title}</TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Outlined">
                  <Timeline align="alternate">
                    {TIMELINES.map((item) => (
                      <TimelineItem key={item.key}>
                        <TimelineSeparator>
                          <MTimelineDot variant="outlined" color={item.color} />
                          {lastItem === item.key ? null : <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>{item.title}</TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Opposite content">
                  <Timeline align="alternate">
                    {TIMELINES.map((item) => (
                      <TimelineItem key={item.key}>
                        <TimelineOppositeContent>
                          <Typography sx={{ color: 'text.secondary' }}>
                            {item.time}
                          </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <MTimelineDot color={item.color} />
                          {lastItem === item.key ? null : <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography> {item.title}</Typography>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Block>
              </Grid>

              <Grid item xs={12}>
                <Block title="Customized">
                  <Timeline align="alternate">
                    {TIMELINES.map((item) => (
                      <TimelineItem key={item.key}>
                        <TimelineOppositeContent>
                          <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary' }}
                          >
                            {item.time}
                          </Typography>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                          <MTimelineDot color={item.color}>
                            {item.icon}
                          </MTimelineDot>
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Paper
                            sx={{
                              p: 3,
                              bgcolor: 'grey.50012'
                            }}
                          >
                            <Typography variant="subtitle2">
                              {item.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: 'text.secondary' }}
                            >
                              {item.des}
                            </Typography>
                          </Paper>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
