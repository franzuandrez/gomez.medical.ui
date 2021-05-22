// material
import {
  Box,
  Card,
  Radio,
  Container,
  Typography,
  RadioGroup,
  CardContent,
  FormControlLabel
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useLocales from '../../hooks/useLocales';
// components
import Page from '../../components/Page';
import Block from '../../components/Block';
import HeaderDashboard from '../../components/HeaderDashboard';

// ----------------------------------------------------------------------

export default function MultiLanguage() {
  const { allLang, currentLang, translate, onChangeLang } = useLocales();

  return (
    <Page title="Components: Multi Language | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Multi Language"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Multi Language' }
          ]}
          moreLink="https://react.i18next.com"
        />

        <Card>
          <CardContent>
            <RadioGroup
              row
              value={currentLang.value}
              onChange={(event) => onChangeLang(event.target.value)}
            >
              {allLang.map((lang) => (
                <FormControlLabel
                  key={lang.label}
                  value={lang.value}
                  label={lang.label}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>

            <Block sx={{ mt: 3 }}>
              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  alt={currentLang.label}
                  src={currentLang.icon}
                  sx={{ mr: 1 }}
                />
                <Typography variant="h2">{translate('demo.title')}</Typography>
              </Box>
              <Typography variant="body1">
                {translate('demo.introduction')}
              </Typography>
            </Block>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
