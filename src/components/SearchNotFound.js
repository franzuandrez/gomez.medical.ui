import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        No encontrado
      </Typography>
      <Typography variant="body2" align="center">
        No se encontraron resultados para &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Intente comprobar si hay errores tipográficos o
        usando palabras completas.
      </Typography>
    </Paper>
  );
}
