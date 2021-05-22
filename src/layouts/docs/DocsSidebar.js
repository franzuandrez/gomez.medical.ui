import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';

// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { List, Box, Drawer, Hidden, ListSubheader } from '@material-ui/core';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
//
import NavItem from './SidebarItem';
import menuLists from './SidebarConfig';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 260;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

// ----------------------------------------------------------------------

DocsSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DocsSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpenSidebar && onCloseSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar>
      <Box sx={{ p: 1, pb: 5 }}>
        <Hidden mdUp>
          <Box sx={{ px: 2, py: 3 }}>
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>

        {menuLists.map((list) => (
          <List
            disablePadding
            key={list.subheader}
            subheader={
              <ListSubheader
                disableSticky
                disableGutters
                sx={{
                  pl: 2,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  color: 'text.primary',
                  typography: 'overline'
                }}
              >
                {list.subheader}
              </ListSubheader>
            }
            sx={{
              '&:not(:last-of-type)': { mb: 5 }
            }}
          >
            {list.items.map((item) => (
              <NavItem key={item.title} link={item} />
            ))}
          </List>
        ))}
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      <Hidden mdUp>
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH, bgcolor: 'background.default' }
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>

      <Hidden mdDown>
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: { width: DRAWER_WIDTH, bgcolor: 'background.default' }
          }}
        >
          <Box sx={{ pt: 10, height: '100%' }}>{renderContent}</Box>
        </Drawer>
      </Hidden>
    </RootStyle>
  );
}
