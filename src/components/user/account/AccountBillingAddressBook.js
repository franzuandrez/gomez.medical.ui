import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// material
import { Box, Card, Button, Typography } from '@material-ui/core';
//
import { MButton } from '../../@material-extend';

// ----------------------------------------------------------------------

AccountBillingAddressBook.propTypes = {
  addressBook: PropTypes.array,
  sx: PropTypes.object
};

export default function AccountBillingAddressBook({ addressBook, sx }) {
  return (
    <Card
      sx={{
        p: 3,
        '&:not(:last-child)': { mb: 3 },
        ...sx
      }}
    >
      <Typography variant="overline" sx={{ color: 'text.secondary' }}>
        Billing Info
      </Typography>

      {addressBook.map((address) => (
        <Box
          key={address.id}
          sx={{
            p: 3,
            mt: 3,
            borderRadius: 1,
            position: 'relative',
            backgroundColor: 'background.neutral'
          }}
        >
          <Typography variant="subtitle1" gutterBottom>
            {address.name}
          </Typography>

          <Typography variant="body2" gutterBottom>
            <Typography
              variant="body2"
              component="span"
              sx={{ color: 'text.secondary' }}
            >
              Address: &nbsp;
            </Typography>
            {`${address.street}, ${address.city}, ${address.state}, ${address.country} ${address.zipCode}`}
          </Typography>

          <Typography variant="body2" gutterBottom>
            <Typography
              variant="body2"
              component="span"
              sx={{ color: 'text.secondary' }}
            >
              Phone: &nbsp;
            </Typography>
            {address.phone}
          </Typography>

          <Box sx={{ mt: 1 }}>
            <MButton
              color="error"
              size="small"
              startIcon={<Icon icon={trash2Fill} />}
              onClick={() => {}}
              sx={{ mr: 1 }}
            >
              Delete
            </MButton>
            <Button
              size="small"
              startIcon={<Icon icon={editFill} />}
              onClick={() => {}}
            >
              Edit
            </Button>
          </Box>
        </Box>
      ))}

      <Button size="small" startIcon={<Icon icon={plusFill} />} sx={{ mt: 3 }}>
        Add new address
      </Button>
    </Card>
  );
}
