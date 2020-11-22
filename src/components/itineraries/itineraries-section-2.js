import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';

import ItenerariesTable from 'src/components/itineraries/table';
import Spinner from 'src/components/common/spinner';
import { useToasts } from 'react-toast-notifications';

function ItinerariesSection2({
  deleteItinerary,
  isSubmitting,
  itineraries,
  itinerariesSuccess,
  resetItinerariesTable,
  resetSuccess,
}) {
  const { addToast } = useToasts();

  useEffect(() => {
    if (!R.isEmpty(itinerariesSuccess)) {
      const itinerariesSuccessMessage = itinerariesSuccess.message;
      addToast(itinerariesSuccessMessage, {
        appearance: 'success',
        autoDismiss: false,
      },
      () => resetItinerariesTable(true));
      resetSuccess({ form: 'itineraries' });
    }
  }, [itinerariesSuccess]);

  return (
    <section className="itineraries-section-2">
      <div className="inner">
        {isSubmitting && (
          <Spinner />
        )}
        {!isSubmitting && (R.isEmpty(itineraries) || R.isNil(itineraries)) && (
          <span>No itineraries available</span>
        )}
        {!isSubmitting && !R.isEmpty(itineraries) && !R.isNil(itineraries) && (
          <ItenerariesTable
            deleteItinerary={deleteItinerary}
            itineraries={itineraries}
            resetItinerariesTable={resetItinerariesTable}
            isDeleting={isSubmitting}
          />
        )}
      </div>
    </section>
  );
}

ItinerariesSection2.prototypes = {
  deleteItinerary: PropTypes.func,
  isSubmitting: PropTypes.bool,
  itineraries: PropTypes.array,
  itinerariesSuccess: PropTypes.object,
  resetItinerariesTable: PropTypes.func,
  resetSuccess: PropTypes.func,
};

export default ItinerariesSection2;
