import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsAnalytics() {
  return (
    <Page title="Documentation: Analytics | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}
