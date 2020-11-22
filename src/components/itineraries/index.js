import React from 'react';
import PropTypes from 'prop-types';
import { ToastProvider } from 'react-toast-notifications';
import PageHeader from 'src/components/common/page-header';
import ItinerariesSection1 from 'src/components/itineraries/itineraries-section-1';
import ItinerariesSection2 from 'src/components/itineraries/itineraries-section-2';

function Itineraries({
  deleteItinerary,
  itineraries,
  isSubmitting,
  itinerariesSuccess,
  resetItinerariesTable,
  resetSuccess,
}) {
  return (
    <>
      <PageHeader title='Itineraries' />
      <ItinerariesSection1 />
      <ToastProvider>
        <ItinerariesSection2
          deleteItinerary={deleteItinerary}
          isSubmitting={isSubmitting}
          itineraries={itineraries}
          itinerariesSuccess={itinerariesSuccess}
          resetItinerariesTable={resetItinerariesTable}
          resetSuccess={resetSuccess}
        />
      </ToastProvider>
    </>
  );
};

Itineraries.prototypes = {
  deleteItinerary: PropTypes.func,
  isSubmitting: PropTypes.bool,
  itineraries: PropTypes.array,
  itinerariesSuccess: PropTypes.object,
  resetItinerariesTable: PropTypes.func,
  resetSuccess: PropTypes.func,
};

export default Itineraries;
