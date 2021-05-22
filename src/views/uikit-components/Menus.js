import { useState } from 'react';
// material
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {
  Card,
  List,
  Grid,
  Menu,
  Button,
  ListItem,
  MenuItem,
  Container,
  IconButton,
  CardContent,
  ListItemText
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Block from '../../components/Block';
import HeaderDashboard from '../../components/HeaderDashboard';

// ----------------------------------------------------------------------

const OPTIONS = [
  'Show some love to Material-UI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content'
];

const OPTIONS_MAXHEIGHT = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel'
];

// ----------------------------------------------------------------------

export default function MenusComponent() {
  const [isOpen, setOpen] = useState(null);
  const [isOpenList, setOpenList] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [isOpenMaxHeight, setOpenMaxHeight] = useState(null);

  const handleClick = (event) => {
    setOpenMaxHeight(event.currentTarget);
  };

  const handleClickListItem = (event) => {
    setOpenList(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpenList(null);
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMaxHeightClose = () => {
    setOpenMaxHeight(null);
  };

  return (
    <Page title="Components: Menus | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Menus"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Menus' }
          ]}
          moreLink="https://next.material-ui.com/components/menus"
        />

        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Block title="Simple">
                  <Button variant="outlined" onClick={handleOpen}>
                    Open Menu
                  </Button>
                  <Menu
                    keepMounted
                    id="simple-menu"
                    anchorEl={isOpen}
                    onClose={handleClose}
                    open={Boolean(isOpen)}
                  >
                    {['Profile', 'My account', 'Logout'].map((option) => (
                      <MenuItem key={option} onClick={handleClose}>
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Selected">
                  <List component="nav" aria-label="Device settings">
                    <ListItem
                      button
                      aria-haspopup="true"
                      aria-controls="lock-menu"
                      aria-label="when device is locked"
                      onClick={handleClickListItem}
                    >
                      <ListItemText
                        primary="When device is locked"
                        secondary={OPTIONS[selectedIndex]}
                      />
                    </ListItem>
                  </List>
                  <Menu
                    keepMounted
                    id="lock-menu"
                    anchorEl={isOpenList}
                    onClose={handleClose}
                    open={Boolean(isOpenList)}
                  >
                    {OPTIONS.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 0}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Max height">
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    keepMounted
                    id="long-menu"
                    anchorEl={isOpenMaxHeight}
                    onClose={handleMaxHeightClose}
                    open={Boolean(isOpenMaxHeight)}
                    PaperProps={{
                      style: {
                        maxHeight: 48 * 4.5,
                        width: '20ch'
                      }
                    }}
                  >
                    {OPTIONS_MAXHEIGHT.map((option) => (
                      <MenuItem
                        key={option}
                        selected={option === 'Pyxis'}
                        onClick={handleMaxHeightClose}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Menu>
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
