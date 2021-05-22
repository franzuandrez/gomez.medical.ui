import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import roundSend from '@iconify/icons-ic/round-send';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
// material
import { Box, TextField, IconButton, InputAdornment } from '@material-ui/core';
//
import MyAvatar from '../../MyAvatar';
import EmojiPicker from '../../EmojiPicker';

// ----------------------------------------------------------------------

ProfilePostCardInput.propTypes = {
  message: PropTypes.string,
  fileInputRef: PropTypes.object,
  commentInputRef: PropTypes.object,
  onSetMessage: PropTypes.func,
  onClickAttach: PropTypes.func,
  onChangeMessage: PropTypes.func,
  sx: PropTypes.object
};

export default function ProfilePostCardInput({
  message,
  fileInputRef,
  commentInputRef,
  onSetMessage,
  onClickAttach,
  onChangeMessage,
  sx
}) {
  return (
    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', ...sx }}>
      <MyAvatar />
      <TextField
        fullWidth
        size="small"
        value={message}
        inputRef={commentInputRef}
        placeholder="Write a comment…"
        onChange={onChangeMessage}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton size="small" onClick={onClickAttach}>
                <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
              </IconButton>
              <EmojiPicker alignRight value={message} setValue={onSetMessage} />
            </InputAdornment>
          )
        }}
        sx={{
          ml: 2,
          mr: 1,
          '& fieldset': {
            borderWidth: `1px !important`,
            borderColor: (theme) => `${theme.palette.grey[500_32]} !important`
          }
        }}
      />
      <IconButton>
        <Icon icon={roundSend} width={24} height={24} />
      </IconButton>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </Box>
  );
}
