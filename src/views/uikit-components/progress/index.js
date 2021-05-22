import { useState, useEffect, useRef } from 'react';
// components
import { Card, Container, CardHeader, CardContent } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderDashboard from '../../../components/HeaderDashboard';
//
import LinearProgress from './Linear';
import CircularProgress from './Circular';

// ----------------------------------------------------------------------

export default function ProgressComponent() {
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Page title="Components: Progress | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Progress"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Progress' }
          ]}
          moreLink="https://next.material-ui.com/components/progress"
        />

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Circular" />
          <CardContent>
            <CircularProgress progress={progress} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Linear" />
          <CardContent>
            <LinearProgress progress={progress} buffer={buffer} />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
