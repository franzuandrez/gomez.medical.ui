import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Link, Hidden, Container, Typography } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import Page from '../components/Page';
import { varFadeInUp, varWrapEnter } from '../components/animate';
import {
  ComponentSidebar,
  ComponentSections
} from '../components/components-overview';

// ----------------------------------------------------------------------

export const getImgComponent = (name, mode) =>
  `/static/components-overview/${name}_${mode}.jpg`;

const LINKS_ROOT = [
  { name: 'colors', sublinks: [] },
  { name: 'typography', sublinks: [] },
  { name: 'shadows', sublinks: [] },
  { name: 'grid', sublinks: [] },
  { name: 'brand', sublinks: [] },
  { name: 'illustrations', sublinks: [] },
  {
    name: 'UI components',
    sublinks: [
      'accordion',
      'app',
      'appbar',
      'avatar',
      'badge.label',
      'buttons',
      'cards',
      'carousel',
      'chart',
      'chip',
      'dialog',
      'form',
      'navigation',
      'notification',
      'popover.tooltip',
      'progress',
      'selection_controls',
      'table',
      'timeline',
      'upload.editor'
    ]
  }
];

const LINKS = LINKS_ROOT.map((link) => {
  const hasSubMenu = link.sublinks.length > 0;

  if (!hasSubMenu) {
    return {
      title: link.name,
      href: `#${link.name}`,
      leftImage: getImgComponent(link.name, 'light'),
      rightImage: getImgComponent(link.name, 'dark')
    };
  }

  return {
    title: link.name,
    href: `#${link.sublinks[0]}`,
    sublinks: link.sublinks.map((name) => ({
      title: name.replace('_', ' ').replace('.', ' & '),
      href: `#${name}`,
      leftImage: getImgComponent(name, 'light'),
      rightImage: getImgComponent(name, 'dark')
    }))
  };
});

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  padding: theme.spacing(20, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(20, 2)
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    alignItems: 'flex-start'
  }
}));

export default function ComponentsOverview() {
  return (
    <RootStyle title="Components Overview | Minimal-UI">
      <Container maxWidth="lg">
        <motion.div initial="initial" animate="animate" variants={varWrapEnter}>
          <motion.div variants={varFadeInUp}>
            <Typography variant="h3" component="h1" paragraph>
              Components
            </Typography>
          </motion.div>

          <motion.div variants={varFadeInUp}>
            <Typography sx={{ color: 'text.secondary' }} paragraph>
              With huge resource pack making deployment easy and <br />
              Expanding more effectively
            </Typography>
          </motion.div>

          <motion.div variants={varFadeInUp}>
            <Link component={RouterLink} to={PATH_DASHBOARD.components.root}>
              Learn more
            </Link>
          </motion.div>
        </motion.div>

        <ContentStyle>
          <Hidden mdDown>
            <ComponentSidebar links={LINKS} />
          </Hidden>
          <ComponentSections links={LINKS} />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
