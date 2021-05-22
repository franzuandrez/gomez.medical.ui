import { filter } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Chip, Typography } from '@material-ui/core';
// utils
import getColorName from '../../../utils/getColorName';
//
import { MButton } from '../../@material-extend';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center'
});

const WrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'stretch',
  margin: theme.spacing(0.5),
  paddingRight: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`
}));

const LabelStyle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  borderRight: `solid 1px ${theme.palette.divider}`
}));

const BlockStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(0.75)
}));

// ----------------------------------------------------------------------

function labelPriceRange(range) {
  if (range === 'below') {
    return 'Below $25';
  }
  if (range === 'between') {
    return 'Between $25 - $75';
  }
  return 'Above $75';
}

ShopTagFiltered.propTypes = {
  formik: PropTypes.object,
  filters: PropTypes.object,
  isShowReset: PropTypes.bool,
  onResetFilter: PropTypes.func
};

export default function ShopTagFiltered({
  formik,
  filters,
  isShowReset,
  onResetFilter,
  ...other
}) {
  const theme = useTheme();
  const { values, handleSubmit, setFieldValue, initialValues } = formik;
  const { gender, category, colors, priceRange, rating } = filters;
  const isShow = values !== initialValues && !isShowReset;

  const handleRemoveGender = (value) => {
    const newValue = filter(gender, (_item) => _item !== value);
    handleSubmit();
    setFieldValue('gender', newValue);
  };

  const handleRemoveCategory = () => {
    handleSubmit();
    setFieldValue('category', 'All');
  };

  const handleRemoveColor = (value) => {
    const newValue = filter(colors, (_item) => _item !== value);
    handleSubmit();
    setFieldValue('colors', newValue);
  };

  const handleRemovePrice = () => {
    handleSubmit();
    setFieldValue('priceRange', '');
  };

  const handleRemoveRating = () => {
    handleSubmit();
    setFieldValue('rating', '');
  };

  return (
    <RootStyle {...other}>
      {gender.length > 0 && (
        <WrapperStyle>
          <LabelStyle component="span" variant="subtitle2">
            Gender:
          </LabelStyle>
          <BlockStyle>
            {gender.map((_gender) => (
              <Chip
                key={_gender}
                label={_gender}
                size="small"
                onDelete={() => handleRemoveGender(_gender)}
                sx={{ ml: 0.5 }}
              />
            ))}
          </BlockStyle>
        </WrapperStyle>
      )}

      {category !== 'All' && (
        <WrapperStyle>
          <LabelStyle component="span" variant="subtitle2">
            Category:
          </LabelStyle>
          <BlockStyle>
            <Chip
              size="small"
              label={category}
              onDelete={handleRemoveCategory}
              sx={{ ml: 0.5 }}
            />
          </BlockStyle>
        </WrapperStyle>
      )}

      {colors.length > 0 && (
        <WrapperStyle>
          <LabelStyle component="span" variant="subtitle2">
            Colors:
          </LabelStyle>
          <BlockStyle>
            {colors.map((color) => (
              <Chip
                key={color}
                label={getColorName(color)}
                size="small"
                onDelete={() => handleRemoveColor(color)}
                sx={{
                  ml: 0.5,
                  bgcolor: color,
                  color: theme.palette.getContrastText(color),
                  ...((color === '#FFFFFF' || color === '#000000') && {
                    border: `solid 1px ${theme.palette.grey[500_32]}`,
                    '& .MuiChip-deleteIcon': {
                      color: 'text.disabled'
                    }
                  })
                }}
              />
            ))}
          </BlockStyle>
        </WrapperStyle>
      )}

      {priceRange && (
        <WrapperStyle>
          <LabelStyle component="span" variant="subtitle2">
            Price:
          </LabelStyle>
          <BlockStyle>
            <Chip
              size="small"
              label={labelPriceRange(priceRange)}
              onDelete={handleRemovePrice}
              sx={{ ml: 0.5 }}
            />
          </BlockStyle>
        </WrapperStyle>
      )}

      {rating && (
        <WrapperStyle>
          <LabelStyle component="span" variant="subtitle2">
            Rating:
          </LabelStyle>
          <BlockStyle>
            <Chip
              size="small"
              label={sentenceCase(rating)}
              onDelete={handleRemoveRating}
              sx={{ ml: 0.5 }}
            />
          </BlockStyle>
        </WrapperStyle>
      )}

      {isShow && (
        <MButton
          color="error"
          size="small"
          type="button"
          onClick={onResetFilter}
          startIcon={<Icon icon={roundClearAll} />}
        >
          Clear All
        </MButton>
      )}
    </RootStyle>
  );
}
