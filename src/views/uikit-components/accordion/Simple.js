import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import {
  Accordion,
  Typography,
  AccordionDetails,
  AccordionSummary
} from '@material-ui/core';

// ----------------------------------------------------------------------

Simple.propTypes = {
  accordions: PropTypes.array
};

export default function Simple({ accordions }) {
  return (
    <>
      {accordions.map((accordion, index) => (
        <Accordion key={accordion.value} disabled={index === 3}>
          <AccordionSummary
            expandIcon={
              <Icon icon={arrowIosDownwardFill} width={20} height={20} />
            }
          >
            <Typography variant="subtitle1">{accordion.heading}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{accordion.detail}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
