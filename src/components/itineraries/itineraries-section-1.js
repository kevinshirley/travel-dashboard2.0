import React from 'react';
import RoundedButton from 'src/components/material-ui/rounded-button';
import Link from 'src/components/common/link';

function ItinerariesSection1() {
  return (
    <section className="itineraries-section-1">
      <div className="inner">
        <Link className='add-itinerary-url' href={'/add-itinerary'}>
          {/* TODO: Change `Add New Itinerary` to `Continue New Itinerary` if currentItinerary in storage is not empty */}
          <RoundedButton className='add-itinerary-cta' text={'Add New Itinerary'} />
        </Link>
        <Link className='add-trip-url' href={'/'}>
          <RoundedButton className='add-trip-cta' text={'Settings'} />
        </Link>
      </div>
    </section>
  );
}

export default ItinerariesSection1;
