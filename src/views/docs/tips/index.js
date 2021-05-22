import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsTips() {
  return (
    <Page title="Documentation: Tips | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}
