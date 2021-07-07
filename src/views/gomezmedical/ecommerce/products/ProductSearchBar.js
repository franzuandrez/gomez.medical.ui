import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';

// material
import {
  experimentalStyled as styled
} from '@material-ui/core/styles';
import {
  Box,
  Toolbar,

  InputAdornment,
  OutlinedInput
} from '@material-ui/core';
import LoadingScreen from '../../../../components/LoadingScreen';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

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

ProductSearchBar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func
};

export default function ProductSearchBar({
                                           filterName,
                                           onFilterName,
                                         }) {


  return (
    <RootStyle
    >

      <SearchStyle
        value={filterName}
        onChange={onFilterName}
        placeholder='Buscar producto...'

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


    </RootStyle>
  );
}
