import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';

// ----------------------------------------------------------------------

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  ...theme.typography.body2,
  height: 44,
  textTransform: 'capitalize',
  padding: theme.spacing(0, 2),
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
  '&.isActive': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    )
  }
}));

// ----------------------------------------------------------------------

SidebarItem.propTypes = {
  link: PropTypes.object
};

export default function SidebarItem({ link }) {
  const { href, title, info } = link;

  return (
    <ListItemStyle
      exact
      button
      to={href}
      disableGutters
      component={RouterLink}
      activeClassName="isActive"
    >
      <ListItemText disableTypography>{title} </ListItemText>

      {info && info}
    </ListItemStyle>
  );
}
