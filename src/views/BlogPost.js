import { useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// material
import {
  Box,
  Card,
  Divider,
  Skeleton,
  Container,
  Typography,
  Pagination
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// redux
import { getPost, getRecentPosts } from '../redux/slices/blog';
import Page from '../components/Page';
import Markdown from '../components/Markdown';
import HeaderDashboard from '../components/HeaderDashboard';
// components
import {
  BlogPostHero,
  BlogPostTags,
  BlogPostRecent,
  BlogPostCommentList,
  BlogPostCommentForm
} from '../components/blog';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    <Skeleton
      width="100%"
      height={560}
      variant="rectangular"
      sx={{ borderRadius: 2 }}
    />
    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
      <Skeleton variant="circular" width={64} height={64} />
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
      </Box>
    </Box>
  </>
);

export default function BlogPost() {
  const dispatch = useDispatch();
  const { title } = useParams();
  const { post, error, recentPosts } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getPost(title));
    dispatch(getRecentPosts(title));
  }, [dispatch, title]);

  return (
    <Page title="Blog: Post Details | Minimal-UI">
      <Container>
        <HeaderDashboard
          heading="Post Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
            { name: sentenceCase(title) }
          ]}
        />

        {post && (
          <Card>
            <BlogPostHero post={post} />

            <Box
              sx={{
                p: { xs: 3, md: 5 }
              }}
            >
              <Typography variant="h6" sx={{ mb: 5 }}>
                {post.description}
              </Typography>

              <Markdown source={post.body} />

              <Box sx={{ my: 5 }}>
                <Divider />
                <BlogPostTags post={post} />
                <Divider />
              </Box>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="h4">Comments</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  ({post.comments.length})
                </Typography>
              </Box>

              <BlogPostCommentList post={post} />

              <Box
                sx={{
                  mb: 5,
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <Pagination count={8} color="primary" />
              </Box>

              <BlogPostCommentForm />
            </Box>
          </Card>
        )}

        {!post && SkeletonLoad}

        {error && <Typography variant="h6">404 Post not found</Typography>}

        {recentPosts.length > 0 && <BlogPostRecent posts={recentPosts} />}
      </Container>
    </Page>
  );
}
