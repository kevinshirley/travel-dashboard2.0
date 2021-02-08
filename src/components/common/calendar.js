import React, { useState } from 'react';
import Calendar from 'react-calendar';
import cx from 'classnames';
import { connect } from 'react-redux';
import * as actions from 'src/store/actions';
import storeConnector from 'src/store/selectors/common';

function ReactCalendar({ isVisible, setTripStartDate }) {
  const [value, setValue] = useState(new Date());

  const handleChange = (date) => {
    setValue(date);
    // setTripStartDate(date);
  };

  const calendarClasses = cx('calendar-container', {
    'not-visible': !isVisible,
  });

  return (
    <div className={calendarClasses}>
      <Calendar
        locale='en-US'
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}

const actionsCreators = {
  setTripStartDate: actions.itinerary.setTripStartDate,
};

export default connect(
  storeConnector,
  actionsCreators,
)(ReactCalendar);
