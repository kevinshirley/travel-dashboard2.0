import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FlightEvent from 'src/components/common/flight-event';
import TripOverview from 'src/components/common/trip-overview';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function ItineraryOverviewDrawerOption({
  categoryTabIndex,
  uploadCoverImage,
  openStartDateCalendar,
  tripStartDate,
  isStartDateCalendarOpened,
  closeStartDateCalendar,
  setPriceType
}) {
  const [value, setValue] = React.useState(categoryTabIndex);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='event-categories'>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className='tabs'
      >
        <Tab disabled={categoryTabIndex !== 0} label="Overview" {...a11yProps(0)} />
      </Tabs>
      <TabPanel className='event-categories-panel' value={value} index={0}>
        <TripOverview
          uploadCoverImage={uploadCoverImage}
          openStartDateCalendar={openStartDateCalendar}
          tripStartDate={tripStartDate}
          isStartDateCalendarOpened={isStartDateCalendarOpened}
          closeStartDateCalendar={closeStartDateCalendar}
          setPriceType={setPriceType}
        />
      </TabPanel>
    </div>
  );
}
