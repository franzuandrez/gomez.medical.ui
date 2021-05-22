import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsStateManagement() {
  return (
    <Page title="Documentation: State Management | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}
