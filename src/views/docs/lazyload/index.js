import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsLazyload() {
  return (
    <Page title="Documentation: Lazyload | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}
