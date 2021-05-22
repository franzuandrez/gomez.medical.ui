import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
import phoneFill from '@iconify/icons-eva/phone-fill';
import emailFill from '@iconify/icons-eva/email-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Avatar,
  Button,
  Divider,
  Collapse,
  Typography
} from '@material-ui/core';

// ----------------------------------------------------------------------

const CollapseButtonStyle = styled(Button)(({ theme }) => ({
  ...theme.typography.overline,
  height: 40,
  borderRadius: 0,
  padding: theme.spacing(1, 2),
  justifyContent: 'space-between',
  color: theme.palette.text.disabled
}));

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: theme.spacing(1.5, 0)
}));

const RowIconStyle = styled(Icon)(({ theme }) => ({
  width: 16,
  height: 16,
  marginTop: 4,
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary
}));

const RowTextStyle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: 160,
  wordWrap: 'break-word',
  ...theme.typography.body2
}));

// ----------------------------------------------------------------------

ChatRoomOneParticipant.propTypes = {
  participants: PropTypes.array.isRequired,
  isCollapse: PropTypes.bool,
  onCollapse: PropTypes.func
};

export default function ChatRoomOneParticipant({
  participants,
  isCollapse,
  onCollapse,
  ...other
}) {
  const participant = [...participants][0];

  if (participant === undefined) {
    return null;
  }

  return (
    <Box {...other}>
      <Box
        sx={{
          pt: 4,
          pb: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Avatar
          alt={participant.name}
          src={participant.avatar}
          sx={{ width: 96, height: 96 }}
        />
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1">{participant.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {participant.position}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <CollapseButtonStyle
        fullWidth
        color="inherit"
        onClick={onCollapse}
        endIcon={
          <Icon
            icon={isCollapse ? arrowIosDownwardFill : arrowIosForwardFill}
            width={16}
            height={16}
          />
        }
      >
        information
      </CollapseButtonStyle>

      <Collapse in={isCollapse}>
        <Box sx={{ px: 2.5, pb: 1 }}>
          <RowStyle>
            <RowIconStyle icon={pinFill} />
            <RowTextStyle>{participant.address}</RowTextStyle>
          </RowStyle>
          <RowStyle>
            <RowIconStyle icon={phoneFill} />
            <RowTextStyle>{participant.phone}</RowTextStyle>
          </RowStyle>
          <RowStyle>
            <RowIconStyle icon={emailFill} />
            <RowTextStyle>{participant.email}</RowTextStyle>
          </RowStyle>
        </Box>
      </Collapse>
    </Box>
  );
}
