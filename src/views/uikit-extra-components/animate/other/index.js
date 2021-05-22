import { Icon } from '@iconify/react';
import { useState } from 'react';
import refreshFill from '@iconify/icons-eva/refresh-fill';
// material
import { Box, Grid, Card, CardContent } from '@material-ui/core';
// components
import { MIconButton } from '../../../../components/@material-extend';
import Block from '../../../../components/Block';
//
import Logo from './Logo';
import SmallClick from './SmallClick';
import MediumClick from './MediumClick';

// ----------------------------------------------------------------------

export default function Other() {
  const [count, setCount] = useState(0);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Block title="Small Click">
              <SmallClick />
            </Block>
          </Grid>

          <Grid item xs={6}>
            <Block title="Medium Click">
              <MediumClick />
            </Block>
          </Grid>

          <Grid item xs={6}>
            <Block title="Path">
              <Box sx={{ position: 'absolute', right: 0, top: 32 }}>
                <MIconButton onClick={() => setCount(count + 1)}>
                  <Icon icon={refreshFill} width={20} height={20} />
                </MIconButton>
              </Box>
              <Logo key={count} />
            </Block>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
