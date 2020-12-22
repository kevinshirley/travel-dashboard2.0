import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CustomerDetailsTab from 'src/components/customer-profile/customer-details-tab.component';
import CustomerNotesTab from 'src/components/customer-profile/customer-notes-tab.component';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
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

const BEM_BLOCK = 'c-customer-profile-tabs';

export default function CustomersSideMenuTabs({ customer, descendantCustomerNotes }) {
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
      <AppBar position='static' color='default'>
        <div className={`${BEM_BLOCK}__header-wrapper`}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='fullWidth'
            aria-label='action tabs example'
          >
            <Tab label='Details' {...a11yProps(0)} />
            <Tab label='Invoices' {...a11yProps(1)} />
            <Tab label='Notes' {...a11yProps(2)} />
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
          <CustomerDetailsTab customer={customer} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          B
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <CustomerNotesTab descendantCustomerNotes={descendantCustomerNotes} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
