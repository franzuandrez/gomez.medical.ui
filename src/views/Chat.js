import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// material
import { Card, Container } from '@material-ui/core';
// redux
import { getConversations, getContacts } from '../redux/slices/chat';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import Page from '../components/Page';
import HeaderDashboard from '../components/HeaderDashboard';
import { ChatSidebar, ChatWindow } from '../components/chat';

// ----------------------------------------------------------------------

export default function Chat() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <Page title="Chat | Minimal-UI">
      <Container maxWidth="xl">
        <HeaderDashboard
          heading="Chat"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Chat' }
          ]}
        />
        <Card sx={{ height: '72vh', display: 'flex' }}>
          <ChatSidebar />
          <ChatWindow />
        </Card>
      </Container>
    </Page>
  );
}
