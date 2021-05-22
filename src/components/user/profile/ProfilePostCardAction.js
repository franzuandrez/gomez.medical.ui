import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import heartFill from '@iconify/icons-eva/heart-fill';
import shareFill from '@iconify/icons-eva/share-fill';
import messageSquareFill from '@iconify/icons-eva/message-square-fill';
// material
import {
  Box,
  Avatar,
  IconButton,
  AvatarGroup,
  FormControlLabel
} from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
//
import { MCheckbox } from '../../@material-extend';

// ----------------------------------------------------------------------

ProfilePostCardAction.propTypes = {
  post: PropTypes.object,
  likes: PropTypes.number,
  isLiked: PropTypes.bool,
  onClickLike: PropTypes.func,
  onClickUnlike: PropTypes.func,
  onClickComment: PropTypes.func,
  sx: PropTypes.object
};

export default function ProfilePostCardAction({
  post,
  likes,
  isLiked,
  onClickLike,
  onClickUnlike,
  onClickComment,
  sx
}) {
  return (
    <Box sx={{ my: 3, display: 'flex', alignItems: 'center', ...sx }}>
      <FormControlLabel
        control={
          <MCheckbox
            size="small"
            color="error"
            checked={isLiked}
            icon={<Icon icon={heartFill} />}
            checkedIcon={<Icon icon={heartFill} />}
            onChange={isLiked ? onClickUnlike : onClickLike}
          />
        }
        label={fShortenNumber(likes)}
        sx={{ minWidth: 72, mr: 0 }}
      />

      <AvatarGroup
        max={4}
        sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}
      >
        {post.personLikes.map((person) => (
          <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
        ))}
      </AvatarGroup>

      <Box sx={{ flexGrow: 1 }} />

      <IconButton onClick={onClickComment}>
        <Icon icon={messageSquareFill} width={20} height={20} />
      </IconButton>
      <IconButton>
        <Icon icon={shareFill} width={20} height={20} />
      </IconButton>
    </Box>
  );
}
