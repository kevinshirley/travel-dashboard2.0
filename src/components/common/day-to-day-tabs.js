import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { indexedObjectToArray } from 'src/utils/object';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(day) {
  return {
    id: `vertical-tab-${day.id}`,
    'aria-controls': `vertical-tabpanel-${day.id}`,
  };
}

export default function DayToDayTabs({ setDayToDayTab, list, tab }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setDayToDayTab(newValue);
  };

  const dayToDays = indexedObjectToArray(list);

  return (
    <>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={tab}
        onChange={handleChange}
        aria-label="Vertical tabs example"
      >
        {dayToDays && dayToDays.map(day => (
          <Tab
            id='text-button'
            key={day.id}
            tabIndex={day.id}
            label={day.name}
            {...a11yProps(day)}
          />
        ))}
      </Tabs>
    </>
  );
}
