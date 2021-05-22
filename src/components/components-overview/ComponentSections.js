import { orderBy } from 'lodash';
import PropTypes from 'prop-types';
import { Element } from 'react-scroll';
// material
import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from 'react-compare-slider';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Hidden, Typography } from '@material-ui/core';
//
import { varFadeInUp, MotionInView } from '../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    paddingLeft: theme.spacing(10)
  }
}));

const ElementStyle = styled(Element)(({ theme }) => ({
  cursor: 'pointer',
  overflow: 'hidden',
  marginBottom: theme.spacing(10),
  boxShadow: theme.customShadows.z16,
  borderRadius: theme.shape.borderRadiusMd
}));

const ControlStyle = styled(Element)(({ theme }) => ({
  width: 3,
  height: '100%',
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.common.white,
  boxShadow: `-16px 0 32px 4px ${theme.palette.grey[500]}`,
  '& .circle': {
    width: 23,
    zIndex: 9,
    height: 23,
    borderRadius: '50%',
    position: 'absolute',
    background: theme.palette.gradients.error,
    boxShadow: 'inset -2px -2px 4px 0 rgba(0, 0, 0, 0.24)'
  },
  '& .circleLarge': {
    zIndex: 8,
    width: 29,
    height: 29,
    boxShadow: theme.shadows[24],
    background: theme.palette.common.white
  }
}));

// ----------------------------------------------------------------------

SectionItem.propTypes = {
  item: PropTypes.object
};

function SectionItem({ item }) {
  const { title, href, leftImage, rightImage } = item;

  return (
    <>
      <Hidden mdUp>
        <Typography variant="h4" sx={{ mb: 5, textTransform: 'capitalize' }}>
          {title}
        </Typography>
      </Hidden>

      {leftImage && (
        <MotionInView variants={varFadeInUp}>
          <ElementStyle name={href}>
            <ReactCompareSlider
              boundsPadding={20}
              handle={
                <ControlStyle>
                  <span className="circle" />
                  <span className="circle circleLarge" />
                </ControlStyle>
              }
              itemOne={
                <ReactCompareSliderImage
                  alt={`${title}-light`}
                  src={leftImage}
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  alt={`${title}-dark`}
                  src={rightImage}
                />
              }
            />
          </ElementStyle>
        </MotionInView>
      )}
    </>
  );
}

ComponentSections.propTypes = {
  links: PropTypes.array.isRequired
};

export default function ComponentSections({ links }) {
  return (
    <RootStyle>
      {links.map((item) => (
        <div key={item.title}>
          <SectionItem item={item} />
          {item.sublinks &&
            orderBy(item.sublinks, ['title'], ['asc']).map((item) => (
              <SectionItem key={item.title} item={item} />
            ))}
        </div>
      ))}
    </RootStyle>
  );
}
