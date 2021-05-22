import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsShadow() {
  return (
    <Page title="Documentation: Shadow | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}
