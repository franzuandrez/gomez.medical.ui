import { useState } from 'react';
// material
import { Card, Container, CardHeader, CardContent } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderDashboard from '../../components/HeaderDashboard';
import {
  UploadAvatar,
  UploadMultiFile,
  UploadSingleFile
} from '../../components/upload';

// ----------------------------------------------------------------------

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState('');

  return (
    <Page title="Components: Upload | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Upload"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Upload' }
          ]}
          moreLink="https://react-dropzone.js.org/#section-basic-example"
        />

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Upload Multi File" />
          <CardContent>
            <UploadMultiFile value={files} onChange={setFiles} />
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardHeader title="Upload Single File" />
          <CardContent>
            <UploadSingleFile value={file} onChange={setFile} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Upload Avatar" />
          <CardContent>
            <UploadAvatar value={photoURL} onChange={setPhotoURL} />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
