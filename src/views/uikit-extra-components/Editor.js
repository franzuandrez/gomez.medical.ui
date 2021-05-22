import { useState } from 'react';
// material
import { Card, Container, CardHeader, CardContent } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderDashboard from '../../components/HeaderDashboard';
import { QuillEditor, DraftEditor } from '../../components/editor';

// ----------------------------------------------------------------------

export default function Editor() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');

  return (
    <Page title="Components: Editor | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Editor"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Editor' }
          ]}
          moreLink={[
            'https://github.com/zenoamaro/react-quill',
            'https://jpuri.github.io/react-draft-wysiwyg'
          ]}
        />

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Quill Simple Editor" />
          <CardContent>
            <QuillEditor
              simple
              id="simple-editor"
              value={text1}
              onChange={(value) => setText1(value)}
            />
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Quill Full Editor" />
          <CardContent>
            <QuillEditor
              id="full-editor"
              value={text2}
              onChange={(value) => setText2(value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Draft Editor" />
          <CardContent>
            <DraftEditor value={text3} onChange={(value) => setText3(value)} />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
