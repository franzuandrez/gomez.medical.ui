import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsTypography() {
  return (
    <Page title="Documentation: Typography | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}
