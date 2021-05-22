import PropTypes from 'prop-types';
// material
import { Box, Avatar, Typography } from '@material-ui/core';
// utils
import { fDate } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

ProfilePostCardComments.propTypes = {
  post: PropTypes.object,
  sx: PropTypes.object
};

export default function ProfilePostCardComments({ post, sx }) {
  const { comments } = post;

  return (
    <Box sx={{ mt: 3, ...sx }}>
      {comments.map((comment) => (
        <Box
          key={comment.id}
          sx={{
            display: 'flex',
            '&:not(:last-child)': { mb: 1.5 }
          }}
        >
          <Avatar alt={comment.author.name} src={comment.author.avatarUrl} />
          <Box
            sx={{
              ml: 2,
              p: 1.5,
              flexGrow: 1,
              borderRadius: 1,
              bgcolor: 'background.neutral'
            }}
          >
            <Box
              sx={{
                mb: 0.5,
                width: '100%',
                alignItems: 'center',
                display: { sm: 'flex' },
                justifyContent: 'space-between'
              }}
            >
              <Typography variant="subtitle2">{comment.author.name}</Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {fDate(comment.createdAt)}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {comment.message}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
