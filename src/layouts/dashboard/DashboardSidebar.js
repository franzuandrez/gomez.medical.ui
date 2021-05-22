import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Link,
  List,
  Button,
  Drawer,
  Hidden,
  Typography,
  ListSubheader
} from '@material-ui/core';
// hooks
import useAuth from '../../hooks/useAuth';
// routes
import { PATH_DASHBOARD, PATH_DOCS } from '../../routes/paths';
// components
import Logo from '../../components/Logo';
import MyAvatar from '../../components/MyAvatar';
import Scrollbar from '../../components/Scrollbar';
//
import MenuLinks from './SidebarConfig';
import SidebarItem from './SidebarItem';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  margin: theme.spacing(1, 2.5, 5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12]
}));

const DocStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundColor:
    theme.palette.mode === 'light'
      ? alpha(theme.palette.primary.main, 0.08)
      : theme.palette.primary.lighter
}));

// ----------------------------------------------------------------------

function reduceChild({ array, item, pathname, level }) {
  const key = item.href + level;

  if (item.items) {
    const match = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    return [
      ...array,
      <SidebarItem
        key={key}
        level={level}
        icon={item.icon}
        info={item.info}
        href={item.href}
        title={item.title}
        open={Boolean(match)}
      >
        {renderSidebarItems({
          pathname,
          level: level + 1,
          items: item.items
        })}
      </SidebarItem>
    ];
  }
  return [
    ...array,
    <SidebarItem
      key={key}
      level={level}
      href={item.href}
      icon={item.icon}
      info={item.info}
      title={item.title}
    />
  ];
}

function renderSidebarItems({ items, pathname, level = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (array, item) => reduceChild({ array, item, pathname, level }),
        []
      )}
    </List>
  );
}

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (isOpenSidebar && onCloseSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar>
      <Box sx={{ px: 2.5, py: 3 }}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Box>

      <Link
        underline="none"
        component={RouterLink}
        to={PATH_DASHBOARD.user.account}
      >
        <AccountStyle>
          <MyAvatar />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              {user.displayName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {user.role}
            </Typography>
          </Box>
        </AccountStyle>
      </Link>

      {MenuLinks.map((list) => (
        <List
          disablePadding
          key={list.subheader}
          subheader={
            <ListSubheader
              disableSticky
              disableGutters
              sx={{
                mt: 3,
                mb: 2,
                pl: 5,
                color: 'text.primary',
                typography: 'overline'
              }}
            >
              {list.subheader}
            </ListSubheader>
          }
        >
          {renderSidebarItems({
            items: list.items,
            pathname
          })}
        </List>
      ))}

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <DocStyle>
          <Box
            component="img"
            alt="doc"
            src="/static/icons/ic_doc.svg"
            sx={{ width: 36, height: 36, mb: 2 }}
          />
          <Typography
            gutterBottom
            variant="subtitle1"
            sx={{ color: 'grey.800' }}
          >
            Hi, {user.displayName}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: 'grey.600' }}>
            Need help?
            <br /> Please check our docs
          </Typography>
          <Button
            fullWidth
            to={PATH_DOCS.root}
            variant="contained"
            component={RouterLink}
          >
            Documentation
          </Button>
        </DocStyle>
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      <Hidden lgUp>
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: { width: DRAWER_WIDTH, bgcolor: 'background.default' }
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </RootStyle>
  );
}
