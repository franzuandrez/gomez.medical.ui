// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Button, Box, Card, Typography, CardContent } from '@material-ui/core';
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import { MButton } from '../../@material-extend';

// ----------------------------------------------------------------------

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2)
}));

// ----------------------------------------------------------------------

export default function EcommerceCurrentBalance() {
  const currentBalance = 187650;
  const sentAmount = 25500;
  const totalAmount = currentBalance - sentAmount;

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          Your Current Balance
        </Typography>
        <Typography variant="h3">{fCurrency(totalAmount)}</Typography>

        <RowStyle>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Your Current Balance
          </Typography>
          <Typography variant="body2">{fCurrency(currentBalance)}</Typography>
        </RowStyle>

        <RowStyle>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Sent Amount
          </Typography>
          <Typography variant="body2">- {fCurrency(sentAmount)}</Typography>
        </RowStyle>

        <RowStyle>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Total Amount
          </Typography>
          <Typography variant="subtitle1">{fCurrency(totalAmount)}</Typography>
        </RowStyle>

        <Box sx={{ mt: 2, display: 'flex' }}>
          <MButton
            fullWidth
            variant="contained"
            color="warning"
            sx={{ mr: 1.5 }}
          >
            Transfer
          </MButton>

          <Button fullWidth variant="contained">
            Receive
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
