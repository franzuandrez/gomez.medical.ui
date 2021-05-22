import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsMultiLanguage() {
  return (
    <Page title="Documentation: Multi Language | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}
