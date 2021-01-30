import React, { useState } from 'react';
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import cx from 'classnames';

import 'src/styles/DatePicker.css';

function ReactDatePicker({ isVisible }) {
  const [value, onChange] = useState(new Date());

  const datePickerClasses = cx('c-date-picker-container', {
    'not-visible': !isVisible,
  });

  return (
    <div className={datePickerClasses}>
      <DatePicker
        locale='en-US'
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default ReactDatePicker;