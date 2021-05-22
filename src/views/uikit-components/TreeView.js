import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring/web.cjs';
// material
import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {
  alpha,
  experimentalStyled as styled,
  withStyles
} from '@material-ui/core/styles';
import {
  Card,
  Grid,
  Collapse,
  Container,
  CardContent
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Block from '../../components/Block';
import HeaderDashboard from '../../components/HeaderDashboard';

// ----------------------------------------------------------------------

const TreeViewStyle = styled(TreeView)({
  height: 240,
  flexGrow: 1,
  maxWidth: 400
});

// ----------------------------------------------------------------------

TransitionComponent.propTypes = {
  in: PropTypes.bool
};

function TransitionComponent(props) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)'
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`
    }
  });
  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    '& .close': { opacity: 0.3 }
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
  }
}))((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
));

export default function TreesViewComponent() {
  return (
    <Page title="Components: Tree View | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Tree View"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Components', href: PATH_DASHBOARD.components.root },
            { name: 'Tree View' }
          ]}
          moreLink="https://next.material-ui.com/components/tree-view"
        />

        <Card>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Block title="Basic">
                  <TreeViewStyle
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    defaultEndIcon={null}
                  >
                    <TreeItem nodeId="1" label="Applications">
                      <TreeItem nodeId="2" label="Calendar" />
                      <TreeItem nodeId="3" label="Chrome" />
                      <TreeItem nodeId="4" label="Webstorm" />
                    </TreeItem>
                    <TreeItem nodeId="5" label="Documents">
                      <TreeItem nodeId="10" label="OSS" />
                      <TreeItem nodeId="6" label="Material-UI">
                        <TreeItem nodeId="7" label="src">
                          <TreeItem nodeId="8" label="index.js" />
                          <TreeItem nodeId="9" label="tree-view.js" />
                        </TreeItem>
                      </TreeItem>
                    </TreeItem>
                  </TreeViewStyle>
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Multi Select">
                  <TreeViewStyle
                    multiSelect
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    defaultEndIcon={null}
                  >
                    <TreeItem nodeId="1" label="Applications">
                      <TreeItem nodeId="2" label="Calendar" />
                      <TreeItem nodeId="3" label="Chrome" />
                      <TreeItem nodeId="4" label="Webstorm" />
                    </TreeItem>
                    <TreeItem nodeId="5" label="Documents">
                      <TreeItem nodeId="6" label="Material-UI">
                        <TreeItem nodeId="7" label="src">
                          <TreeItem nodeId="8" label="index.js" />
                          <TreeItem nodeId="9" label="tree-view.js" />
                        </TreeItem>
                      </TreeItem>
                    </TreeItem>
                  </TreeViewStyle>
                </Block>
              </Grid>

              <Grid item xs={12} md={4}>
                <Block title="Customized">
                  <TreeViewStyle defaultExpanded={['1']}>
                    <StyledTreeItem nodeId="1" label="Main">
                      <StyledTreeItem nodeId="2" label="Hello" />
                      <StyledTreeItem nodeId="3" label="Subtree with children">
                        <StyledTreeItem nodeId="6" label="Hello" />
                        <StyledTreeItem
                          nodeId="7"
                          label="Sub-subtree with children"
                        >
                          <StyledTreeItem nodeId="9" label="Child 1" />
                          <StyledTreeItem nodeId="10" label="Child 2" />
                          <StyledTreeItem nodeId="11" label="Child 3" />
                        </StyledTreeItem>
                        <StyledTreeItem nodeId="8" label="Hello" />
                      </StyledTreeItem>
                      <StyledTreeItem nodeId="4" label="World" />
                      <StyledTreeItem nodeId="5" label="Something something" />
                    </StyledTreeItem>
                  </TreeViewStyle>
                </Block>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
