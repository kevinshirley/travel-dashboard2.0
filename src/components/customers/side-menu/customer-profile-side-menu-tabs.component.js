import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ADD_CIRCLE_OUTLINE_ICON, SPACING } from 'src/components/material-ui/icons';
import Button from 'src/components/material-ui/text-button';
import CustomerSideMenuProfileNotes from 'src/components/customers/side-menu/customer-profile-notes.component.js';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const BEM_BLOCK = 'c-customers-side-menu-tabs';

export default function CustomersSideMenuTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={BEM_BLOCK}>
      <AppBar position="static" color="default">
        <div className={`${BEM_BLOCK}__header-wrapper`}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="Trips" {...a11yProps(0)} />
            <Tab label="Notes" {...a11yProps(1)} />
          </Tabs>
        </div>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        className={`${BEM_BLOCK}__content`}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className={`${BEM_BLOCK}__add-itinerary-btn-wrapper`}>
            <Button className={`${BEM_BLOCK}__add-itinerary-btn`} onClick={() => console.log('button add itinerary')}>
              {ADD_CIRCLE_OUTLINE_ICON}{SPACING}Add itinerary
            </Button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CustomerSideMenuProfileNotes />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
