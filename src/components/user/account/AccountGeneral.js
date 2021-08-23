import {
  Box,
  Grid,
  Card,
  TextField,
  CardContent,
} from '@material-ui/core';

// hooks
import useAuth from '../../../hooks/useAuth';
import { UploadAvatar } from '../../upload';
//


export default function AccountGeneral() {

  const { user } = useAuth();


  return (

    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <Box
            sx={{
              my: 10,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
          >
            <UploadAvatar
              disabled
            />

          </Box>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField

                  fullWidth
                  label='Nombre'
                  value={`${user.person?.first_name} ${user.person?.last_name}`}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth

                  label='Correo'
                  value={user.email}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Teléfono'
                  value={user.business_entity?.phone_numbers.length > 0 ? user.business_entity?.phone_numbers[0].phone_number : ''}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Dirección'

                  value={user.business_entity?.addresses.length > 0 ? user.business_entity?.addresses[0].address.address_line_1 : ''}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField

                  fullWidth
                  label='Ciudad'
                  value={user.business_entity?.addresses.length > 0 ? user.business_entity?.addresses[0].address.city : ''}
                />
              </Grid>


            </Grid>


          </CardContent>
        </Card>
      </Grid>
    </Grid>

  );
}
