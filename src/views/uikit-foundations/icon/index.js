import { Icon } from '@iconify/react';
import clockFill from '@iconify/icons-eva/clock-fill';
import chargingFill from '@iconify/icons-eva/charging-fill';
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import colorPaletteFill from '@iconify/icons-eva/color-palette-fill';
import arrowCircleDownFill from '@iconify/icons-eva/arrow-circle-down-fill';
// material
import AdbIcon from '@material-ui/icons/Adb';
import AddIcon from '@material-ui/icons/Add';
import AppleIcon from '@material-ui/icons/Apple';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import {
  Card,
  SvgIcon,
  Container,
  CardHeader,
  CardContent
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Block from '../../../components/Block';
import CodeSnippets from '../../../components/CodeSnippets';
import SvgIconStyle from '../../../components/SvgIconStyle';
import HeaderDashboard from '../../../components/HeaderDashboard';
import { material, iconify, local } from './data';

// ----------------------------------------------------------------------

export default function FoundationIcons() {
  return (
    <Page title="Foundations: Icons | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Icons"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Foundations', href: PATH_DASHBOARD.foundations.root },
            { name: 'Icons' }
          ]}
          moreLink={[
            'https://material-ui.com/components/material-icons',
            'https://iconify.design/icon-sets'
          ]}
        />

        <Card sx={{ mb: 5 }}>
          <CardHeader title="Material Icons" />
          <CardContent>
            <Block>
              <CodeSnippets source={material} />
              <AdbIcon color="action" />
              <AddIcon color="disabled" />
              <AccountCircleIcon color="error" />
              <AirplanemodeActiveIcon color="inherit" />
              <AppleIcon color="primary" />
            </Block>
          </CardContent>
        </Card>

        <Card sx={{ mb: 5 }}>
          <CardHeader title="Iconify Icons" />
          <CardContent>
            <Block>
              <CodeSnippets source={iconify} />
              <SvgIcon color="action">
                <Icon icon={alertCircleFill} width={24} height={24} />
              </SvgIcon>
              <SvgIcon color="disabled">
                <Icon icon={chargingFill} width={24} height={24} />
              </SvgIcon>
              <SvgIcon color="error">
                <Icon icon={arrowCircleDownFill} width={24} height={24} />
              </SvgIcon>
              <SvgIcon color="inherit">
                <Icon icon={clockFill} width={24} height={24} />
              </SvgIcon>
              <SvgIcon color="primary">
                <Icon icon={colorPaletteFill} width={24} height={24} />
              </SvgIcon>
            </Block>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Local Icons" />
          <CardContent>
            <Block>
              <CodeSnippets source={local} />
              <SvgIconStyle src="/static/icons/browser-edge.svg" />
              <SvgIconStyle
                src="/static/icons/browser-edge.svg"
                color="action"
              />
              <SvgIconStyle
                src="/static/icons/browser-edge.svg"
                color="disabled"
              />
              <SvgIconStyle
                src="/static/icons/browser-edge.svg"
                color="primary"
              />
              <SvgIconStyle src="/static/icons/elephant.svg" color="info" />
              <SvgIconStyle src="/static/icons/json-logo.svg" color="success" />
              <SvgIconStyle
                src="/static/icons/love-camera.svg"
                color="warning"
              />
              <SvgIconStyle src="/static/icons/shield.svg" color="error" />
            </Block>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
