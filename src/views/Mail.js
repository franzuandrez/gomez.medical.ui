import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// material
import { Container, Card } from '@material-ui/core';
// redux
import { getLabels } from '../redux/slices/mail';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import Page from '../components/Page';
import HeaderDashboard from '../components/HeaderDashboard';
import {
  MailList,
  MailDetails,
  MailSidebar,
  MailCompose
} from '../components/mail';

// ----------------------------------------------------------------------

export default function Mail() {
  const dispatch = useDispatch();
  const { mailId } = useParams();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openCompose, setOpenCompose] = useState(false);

  useEffect(() => {
    dispatch(getLabels());
  }, [dispatch]);

  return (
    <Page title="Mail | Minimal-UI">
      <Container maxWidth="xl">
        <HeaderDashboard
          heading="Mail"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root
            },
            { name: 'Mail' }
          ]}
        />
        <Card sx={{ height: { md: '72vh' }, display: { md: 'flex' } }}>
          <MailSidebar
            isOpenSidebar={openSidebar}
            onCloseSidebar={() => setOpenSidebar(false)}
            onOpenCompose={() => setOpenCompose(true)}
          />
          {mailId ? (
            <MailDetails />
          ) : (
            <MailList onOpenSidebar={() => setOpenSidebar(true)} />
          )}
          <MailCompose
            isOpenCompose={openCompose}
            onCloseCompose={() => setOpenCompose(false)}
          />
        </Card>
      </Container>
    </Page>
  );
}
