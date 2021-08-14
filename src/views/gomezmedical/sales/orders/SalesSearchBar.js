import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';

import {
  experimentalStyled as styled
} from '@material-ui/core/styles';
import {
  Box,
  InputAdornment,
  OutlinedInput
} from '@material-ui/core';

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

SalesSearchBar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func
};

export default function SalesSearchBar({
                                    filterName,
                                    onFilterName,
                                  }) {


  return (
    <>
      <SearchStyle
        value={filterName}
        onChange={onFilterName}
        placeholder='Buscar'

        startAdornment={
          <InputAdornment position='start'>
            <Box
              component={Icon}
              icon={searchFill}
              sx={{ color: 'text.disabled' }}
            />
          </InputAdornment>
        }
      />


    </>
  );
}
