import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsEnvironmentVariables() {
  return (
    <Page title="Documentation: Environment Variables | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}
