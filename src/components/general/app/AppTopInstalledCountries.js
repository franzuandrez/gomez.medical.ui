import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import appleFilled from '@iconify/icons-ant-design/apple-filled';
import windowsFilled from '@iconify/icons-ant-design/windows-filled';
import androidFilled from '@iconify/icons-ant-design/android-filled';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardHeader,
  Typography,
  CardContent
} from '@material-ui/core';
//
import Scrollbar from '../../Scrollbar';
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const INSTALLED = [
  {
    name: 'Germany',
    android: faker.datatype.number(),
    windows: faker.datatype.number(),
    apple: faker.datatype.number(),
    flag: '/static/icons/ic_flag_de.svg'
  },
  {
    name: 'England',
    android: faker.datatype.number(),
    windows: faker.datatype.number(),
    apple: faker.datatype.number(),
    flag: '/static/icons/ic_flag_en.svg'
  },
  {
    name: 'France',
    android: faker.datatype.number(),
    windows: faker.datatype.number(),
    apple: faker.datatype.number(),
    flag: '/static/icons/ic_flag_fr.svg'
  },
  {
    name: 'Korean',
    android: faker.datatype.number(),
    windows: faker.datatype.number(),
    apple: faker.datatype.number(),
    flag: '/static/icons/ic_flags_kr.svg'
  },
  {
    name: 'USA',
    android: faker.datatype.number(),
    windows: faker.datatype.number(),
    apple: faker.datatype.number(),
    flag: '/static/icons/ic_flags_us.svg'
  }
];

const ItemBlockStyle = styled('div')(({ theme }) => ({
  flex: '1 1',
  minWidth: 72,
  display: 'flex',
  alignItems: 'center',
  '&:not(:first-of-type)': { marginLeft: theme.spacing(2) },
  '&:first-of-type': { minWidth: 120 }
}));

const ItemIconStyle = styled(Icon)(({ theme }) => ({
  width: 16,
  height: 16,
  marginRight: theme.spacing(0.5),
  color: theme.palette.text.disabled
}));

// ----------------------------------------------------------------------

CountryItem.propTypes = {
  country: PropTypes.object
};

function CountryItem({ country }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        '&:not(:first-child)': { mt: 3 }
      }}
    >
      <ItemBlockStyle>
        <Box
          component="img"
          alt={country.name}
          src={country.flag}
          sx={{ height: 20, mr: 1 }}
        />
        <Typography variant="subtitle2">{country.name}</Typography>
      </ItemBlockStyle>
      <ItemBlockStyle>
        <ItemIconStyle icon={androidFilled} />
        <Typography variant="body2">
          {fShortenNumber(country.android)}
        </Typography>
      </ItemBlockStyle>
      <ItemBlockStyle>
        <ItemIconStyle icon={windowsFilled} />
        <Typography variant="body2">
          {fShortenNumber(country.windows)}
        </Typography>
      </ItemBlockStyle>
      <ItemBlockStyle>
        <ItemIconStyle icon={appleFilled} />
        <Typography variant="body2">
          {fShortenNumber(country.windows)}
        </Typography>
      </ItemBlockStyle>
    </Box>
  );
}

export default function AppTopInstalledCountries() {
  return (
    <Card>
      <CardHeader title="Top Installed Countries" />
      <CardContent>
        <Scrollbar>
          {INSTALLED.map((country) => (
            <CountryItem key={country.name} country={country} />
          ))}
        </Scrollbar>
      </CardContent>
    </Card>
  );
}
