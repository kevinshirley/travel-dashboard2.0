import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FlightEvent from 'src/components/common/flight-event';
import ActivityEvent from 'src/components/common/activity-event';
import AccommodationEvent from 'src/components/common/accommodation-event';
import TransportationEvent from 'src/components/common/transportation-event';
import TourEvent from 'src/components/common/tour-event';
import CruiseEvent from 'src/components/common/cruise-event';
import InfoEvent from 'src/components/common/info-event';
import * as actions from 'src/store/actions';
import { useRouter } from 'next/router';
import { useAction } from 'src/store/hooks';
import { ADD_ITINERARY, MANAGE_ITINERARY } from 'src/store/constants/url';

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

export default function EventCategories({ categoryTabIndex, day, event }) {
  const router = useRouter();
  const [value, setValue] = React.useState(categoryTabIndex);
  const deleteEventToDay = useAction(actions.itinerary.deleteEventToDay);
  const deleteManagedEventToDay = useAction(actions.itinerary.deleteManagedEventToDay);

  const deleteEvent = ({ day, event }) => {
    if (router.pathname === ADD_ITINERARY) {
      deleteEventToDay({ day, event });
    }
    if (router.pathname === MANAGE_ITINERARY) {
      deleteManagedEventToDay({ day, event });
    }
  }

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
        <Tab disabled={categoryTabIndex !== 0} label="Flight" {...a11yProps(0)} />
        <Tab disabled={categoryTabIndex !== 1} label="Activity" {...a11yProps(1)} />
        <Tab disabled={categoryTabIndex !== 2} label="Accommodation" {...a11yProps(2)} />
        <Tab disabled={categoryTabIndex !== 3} label="Transportation" {...a11yProps(3)} />
        <Tab disabled={categoryTabIndex !== 4} label="Tour" {...a11yProps(4)} />
        <Tab disabled={categoryTabIndex !== 5} label="Cruise" {...a11yProps(5)} />
        <Tab disabled={categoryTabIndex !== 6} label="Info" {...a11yProps(6)} />
      </Tabs>
      <TabPanel className='event-categories-panel' value={value} index={0}>
        <FlightEvent
          day={day}
          deleteEvent={deleteEvent}
          event={event}
        />
      </TabPanel>
      <TabPanel className='event-categories-panel' value={value} index={1}>
        <ActivityEvent
          day={day}
          deleteEvent={deleteEvent}
          event={event}
        />
      </TabPanel>
      <TabPanel className='event-categories-panel' value={value} index={2}>
        <AccommodationEvent
          day={day}
          deleteEvent={deleteEvent}
          event={event}
        />
      </TabPanel>
      <TabPanel className='event-categories-panel' value={value} index={3}>
        <TransportationEvent
          day={day}
          deleteEvent={deleteEvent}
          event={event}
        />
      </TabPanel>
      <TabPanel className='event-categories-panel' value={value} index={4}>
        <TourEvent
          day={day}
          deleteEvent={deleteEvent}
          event={event}
        />
      </TabPanel>
      <TabPanel className='event-categories-panel' value={value} index={5}>
        <CruiseEvent
          day={day}
          deleteEvent={deleteEvent}
          event={event}
        />
      </TabPanel>
      <TabPanel className='event-categories-panel' value={value} index={6}>
        <InfoEvent
          day={day}
          deleteEvent={deleteEvent}
          event={event}
        />
      </TabPanel>
    </div>
  );
}
