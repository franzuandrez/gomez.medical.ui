import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import chevronUpFill from '@iconify/icons-eva/chevron-up-fill';
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
// material
import { Box, Menu, Button, MenuItem, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

function renderLabel(label) {
  if (label === 'featured') {
    return 'Featured';
  }
  if (label === 'newest') {
    return 'Newest';
  }
  if (label === 'priceDesc') {
    return 'Price: High-Low';
  }
  if (label === 'priceAsc') {
    return 'Price: Low-High';
  }
  return label;
}

ShopProductSort.propTypes = {
  sortBy: PropTypes.string,
  sortByOptions: PropTypes.array,
  onSortBy: PropTypes.func,
  sx: PropTypes.object
};

export default function ShopProductSort({
  sortByOptions,
  sortBy,
  onSortBy,
  sx,
  ...other
}) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleonSortBy = (value) => {
    handleClose();
    onSortBy(value);
  };

  return (
    <Box
      sx={{
        ml: { sm: 3 },
        ...sx
      }}
      {...other}
    >
      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Icon icon={open ? chevronUpFill : chevronDownFill} />}
      >
        Sort By:&nbsp;
        <Typography
          component="span"
          variant="subtitle2"
          sx={{ color: 'text.secondary' }}
        >
          {renderLabel(sortBy)}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {sortByOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sortBy}
            onClick={() => handleonSortBy(option.value)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
