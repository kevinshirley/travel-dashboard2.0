import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import SearchBar from 'src/components/common/search-bar';
import selectMockCustomers from 'src/store/constants/customers';
import CustomersAllTabContent from 'src/components/customers/customers-all-tab-content.component';

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

export default function CustomersTabs({ userCustomers }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const mockCustomers = selectMockCustomers();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className='c-customers-tabs'>
      <AppBar position="static" color="default">
        <div className='c-customers-tabs__header-wrapper'>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="Customers" {...a11yProps(1)} />
          </Tabs>
          <div className='c-customers-tabs__search-bar-wrapper'>
            <SearchBar placeholder='Search by name' />
          </div>
        </div>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        className='c-customer-tab-content'
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <CustomersAllTabContent customers={userCustomers} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          B
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
