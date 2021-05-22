import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Button,
  AppBar,
  Hidden,
  Toolbar,
  IconButton
} from '@material-ui/core';
// components
import Logo from '../../components/Logo';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const APPBAR_HEIGHT = 64;

const RootStyle = styled(AppBar)(({ theme }) => ({
  zIndex: 999,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  boxShadow: theme.customShadows.z8,
  color: theme.palette.text.primary,
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('md')]: { zIndex: 1999 }
}));

// ----------------------------------------------------------------------

DocsNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default function DocsNavbar({ onOpenSidebar }) {
  return (
    <RootStyle>
      <Toolbar sx={{ minHeight: APPBAR_HEIGHT }}>
        <Hidden mdUp>
          <IconButton onClick={onOpenSidebar} color="inherit">
            <Icon icon={menu2Fill} />
          </IconButton>
        </Hidden>

        <Hidden mdDown>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Hidden>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          disableRipple
          to={PATH_DASHBOARD.root}
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          Dashboard
        </Button>
      </Toolbar>
    </RootStyle>
  );
}
