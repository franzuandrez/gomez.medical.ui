import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Radio,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  Typography,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';
//

import { MIconButton } from '../../@material-extend';
import Scrollbar from '../../Scrollbar';
import ColorManyPicker from '../../ColorManyPicker';

// ----------------------------------------------------------------------

const BlockStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 3),
  marginBottom: theme.spacing(3)
}));

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  colorOptions: PropTypes.array,
  ratingOptions: PropTypes.array,
  categoryOptions: PropTypes.array,
  genderOptions: PropTypes.array,
  priceOptions: PropTypes.array,
  isOpenFilter: PropTypes.bool,
  onResetFilter: PropTypes.func,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  formik: PropTypes.object
};

export default function ShopFilterSidebar({
  colorOptions,
  ratingOptions,
  categoryOptions,
  genderOptions,
  priceOptions,
  isOpenFilter,
  onResetFilter,
  onOpenFilter,
  onCloseFilter,
  formik
}) {
  const { values, getFieldProps, handleChange } = formik;

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
      >
        Filters&nbsp;
      </Button>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Drawer
            anchor="right"
            open={isOpenFilter}
            onClose={onCloseFilter}
            PaperProps={{
              sx: { width: 280, border: 'none', overflow: 'hidden' }
            }}
          >
            <Box
              sx={{
                px: 1,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                Filters
              </Typography>
              <MIconButton onClick={onCloseFilter}>
                <Icon icon={closeFill} width={20} height={20} />
              </MIconButton>
            </Box>

            <Divider />

            <Scrollbar>
              <BlockStyle sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Gender
                </Typography>
                <FormGroup>
                  {genderOptions.map((item) => (
                    <FormControlLabel
                      key={item}
                      control={
                        <Checkbox
                          {...getFieldProps('gender')}
                          value={item}
                          checked={values.gender.includes(item)}
                        />
                      }
                      label={item}
                    />
                  ))}
                </FormGroup>
              </BlockStyle>

              <BlockStyle>
                <Typography variant="subtitle1" gutterBottom>
                  Category
                </Typography>
                <RadioGroup {...getFieldProps('category')}>
                  {categoryOptions.map((item) => (
                    <FormControlLabel
                      key={item}
                      value={item}
                      control={<Radio />}
                      label={item}
                    />
                  ))}
                </RadioGroup>
              </BlockStyle>

              <BlockStyle>
                <Typography variant="subtitle1" gutterBottom>
                  Colour
                </Typography>
                <ColorManyPicker
                  name="colors"
                  colors={colorOptions}
                  onChange={handleChange}
                  onChecked={(color) => values.colors.includes(color)}
                  sx={{ maxWidth: 36 * 4 }}
                />
              </BlockStyle>

              <BlockStyle>
                <Typography variant="subtitle1" gutterBottom>
                  Price
                </Typography>
                <RadioGroup {...getFieldProps('priceRange')}>
                  {priceOptions.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </BlockStyle>

              <BlockStyle>
                <Typography variant="subtitle1" gutterBottom>
                  Rating
                </Typography>
                <RadioGroup {...getFieldProps('rating')}>
                  {ratingOptions.map((item, index) => (
                    <FormControlLabel
                      key={item}
                      value={item}
                      control={
                        <Radio
                          disableRipple
                          color="default"
                          icon={<Rating readOnly value={4 - index} />}
                          checkedIcon={<Rating readOnly value={4 - index} />}
                        />
                      }
                      label="& Up"
                      sx={{
                        my: 0.5,
                        borderRadius: 1,
                        '& > :first-child': { py: 0.5 },
                        '&:hover': {
                          opacity: 0.48,
                          '& > *': { bgcolor: 'transparent' }
                        },
                        ...(values.rating.includes(item) && {
                          bgcolor: 'background.neutral'
                        })
                      }}
                    />
                  ))}
                </RadioGroup>
              </BlockStyle>
            </Scrollbar>

            <Box sx={{ p: 3 }}>
              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                onClick={onResetFilter}
                startIcon={<Icon icon={roundClearAll} />}
              >
                Clear All
              </Button>
            </Box>
          </Drawer>
        </Form>
      </FormikProvider>
    </>
  );
}
