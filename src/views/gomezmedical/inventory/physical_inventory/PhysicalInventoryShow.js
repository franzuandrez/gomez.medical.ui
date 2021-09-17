import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';

import Page from '../../../../components/Page';
import HeaderDashboard from '../../../../components/HeaderDashboard';
import { PATH_APP } from '../../../../routes/paths';
import apiInventoryManagement from '../../../../services/api/inventory/apiInventoryManagement';
import Label from '../../../../components/Label';
import Scrollbar from '../../../../components/Scrollbar';
import { fCurrency } from '../../../../utils/formatNumber';


export default function PhysicalInventoryShow() {

  const { id } = useParams();


  const {
    isLoading,
    isSuccess,
    data: inventory
  } = useQuery(['physical_show', id], () => apiInventoryManagement.getSingle(id)
    , {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false
    });
  return (
    <Page title='Inventario Físico: Ver | Gomez-Medical'>
      <Container>
        <HeaderDashboard
          heading='Inventario Físico'
          links={[
            { name: 'Físico', href: PATH_APP.inventory.physicalInventory },
            { name: 'Ver' }
          ]}

        />
        {isLoading && <LinearProgress />}

        {isSuccess &&
        < Card sx={{ pt: 5, px: 5 }}>

          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Box
                component='img'
                alt='logo'
                src='/static/brand/logo_full.svg'
                sx={{ height: 48 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Box sx={{ textAlign: { sm: 'right' } }}>
                <Label
                  color='success'
                  sx={{ textTransform: 'uppercase', mb: 1 }}
                >
                  {inventory.status}
                </Label>
                <Typography variant='h6'>Inventario Físico #{id}</Typography>
              </Box>
            </Grid>


            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography
                paragraph
                variant='overline'
                sx={{ color: 'text.disabled' }}
              >
                Fecha
              </Typography>
              <Typography variant='body2'>
                Inicio: {inventory.start_date}
              </Typography>
              <Typography variant='body2'>
                Fin: {inventory.end_date}
              </Typography>
            </Grid>

          </Grid>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 960 }}>
              <Table>
                <TableHead
                  sx={{
                    borderBottom: (theme) =>
                      `solid 1px ${theme.palette.divider}`,
                    '& th': { backgroundColor: 'transparent' }
                  }}
                >
                  <TableRow>
                    <TableCell width={40}>#</TableCell>
                    <TableCell align='left'>Producto</TableCell>
                    <TableCell align='left'>Lote</TableCell>
                    <TableCell align='left'>Ubicacion</TableCell>
                    <TableCell align='left'>Total Sistema</TableCell>
                    <TableCell align='left'>Total Fisico</TableCell>
                    <TableCell align='left'>Total Faltante</TableCell>
                    <TableCell align='left'>Indica de consolidación</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {inventory.detail.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        borderBottom: (theme) =>
                          `solid 1px ${theme.palette.divider}`
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align='left'>
                        <Box sx={{ maxWidth: 560 }}>
                          <Typography variant='subtitle2'>
                            {row.product.name}
                          </Typography>
                          <Typography
                            variant='body2'
                            sx={{ color: 'text.secondary' }}
                            noWrap
                          >
                            {row.product.description_formatted}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align='left'>{row.batch}</TableCell>
                      <TableCell align='left'>{row.location.name}</TableCell>
                      <TableCell align='left'>{row.system_quantity}</TableCell>
                      <TableCell align='left'>{row.physical_quantity}</TableCell>
                      <TableCell align='left'>{row.missing_quantity}</TableCell>
                      <TableCell
                        align='left'>%
                        {
                          (Math.round(
                            (
                              (row.physical_quantity === 0 ? 1 : row.physical_quantity)
                              /
                              (row.system_quantity === 0 ? 1 : row.system_quantity)
                            ) * 100) / 100) * 100
                        }

                      </TableCell>


                    </TableRow>
                  ))}


                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <Divider sx={{ mt: 5 }} />
          <Grid container>
            <Grid item xs={12} md={9} sx={{ py: 3 }}>
              <Typography variant='subtitle2'>Notas</Typography>
              <Typography variant='body2'>
                {inventory.comments}
              </Typography>
            </Grid>

          </Grid>
        </Card>
        }
      </Container>
    </Page>
  );

};
