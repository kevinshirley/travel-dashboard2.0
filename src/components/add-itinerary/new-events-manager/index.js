import React from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/material-ui/text-button';
import List from 'src/components/material-ui/list';
import Fade from 'react-reveal/Fade';

const NewEventsManager = ({
  addEventToDay,
  closeNewEventList,
  dayToDay,
  isNewEventListOpened,
  itineraryEvents,
  openNewEventList,
  addEventToUpdatingDay,
}) => (
  <div className='new-events-container'>
    {isNewEventListOpened ? (
      <Button className='new-event-cta' onClick={closeNewEventList}>x Close</Button>
    ) : (
      <Button className='new-event-cta' onClick={openNewEventList}>+ New Event</Button>
    )}
    <Fade bottom>
      <List
        addEventToDay={addEventToDay}
        dayToDay={dayToDay}
        addEventToUpdatingDay={addEventToUpdatingDay}
        list={itineraryEvents}
        isVisible={isNewEventListOpened}
        closeNewEventList={closeNewEventList}
      />
    </Fade>
  </div>
);

NewEventsManager.propTypes = {
  addEventToDay: PropTypes.any,
  closeNewEventList: PropTypes.any,
  dayToDay: PropTypes.any,
  addEventToUpdatingDay: PropTypes.func,
  isNewEventListOpened: PropTypes.any,
  itineraryEvents: PropTypes.any,
  openNewEventList: PropTypes.any,
};

export default NewEventsManager;
