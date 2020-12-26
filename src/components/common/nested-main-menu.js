import React from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import {
  HOME_ICON, 
  PEOPLE_ICON, 
  BAR_CHART_ICON,
  TODAY_CALENDAR_ICON,
  CLOCK_ICON,
  SETTINGS_ICON,
  LOGOUT_ICON,
  RECEIPT_ICON,
} from 'src/components/material-ui/icons';
import * as actions from 'src/store/actions';
import { useAction } from 'src/store/hooks';
import Link from 'src/components/common/link';
import { CHEVRON_RIGHT_ICON, CHEVRON_LEFT_ICON } from 'src/components/material-ui/icons';
import { selectIsMainMenuMinimized } from 'src/store/selectors/common';

export default function NestedList() {
  const [open, setOpen] = React.useState(false);
  const logout = useAction(actions.session.logout);
  const isMainMenuMinimized = useSelector(selectIsMainMenuMinimized);
  const shouldMainMenuMinimize = useAction(actions.ui.isMainMenuMinimized);

  const nestedMainMenuClasses = cx('nested-main-menu', {
    'nested-main-menu__minimized': isMainMenuMinimized,
  });

  const handleClick = () => {
    setOpen(!open);
  };

  const onMinimizeClicked = () => shouldMainMenuMinimize();

  return (
    <List
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          <span>
            Travel Dashboard
          </span>
        </ListSubheader>
      }
      className={nestedMainMenuClasses}
    >
      <div className='inner'>
        <div className='main-navigation'>
          <Link className='main-navigation-icon' href='/'>
            <ListItem button>
              <ListItemIcon>
                {HOME_ICON}
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
          </Link>
          <Link className='main-navigation-icon' href='/customers'>
            <ListItem button>
              <ListItemIcon>
                {PEOPLE_ICON}
              </ListItemIcon>
              <ListItemText primary='Customers' />
            </ListItem>
          </Link>
          <Link className='main-navigation-icon' href='/itineraries'>
            <ListItem button>
              <ListItemIcon>
                {TODAY_CALENDAR_ICON}
              </ListItemIcon>
              <ListItemText primary='Itineraries' />
            </ListItem>
          </Link>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              {RECEIPT_ICON}
            </ListItemIcon>
            <ListItemText primary='Accounting' />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem button>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary='Starred' />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary='Starred 2' />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary='Starred 3' />
              </ListItem>
            </List>
          </Collapse>
          <Link className='main-navigation-icon' href='/reports'>
            <ListItem button>
              <ListItemIcon>
                {BAR_CHART_ICON}
              </ListItemIcon>
              <ListItemText primary='Reports' />
            </ListItem>
          </Link>
          <Link className='main-navigation-icon' href='/search-history'>
            <ListItem button>
              <ListItemIcon>
                {CLOCK_ICON}
              </ListItemIcon>
              <ListItemText primary='Search History' />
            </ListItem>
          </Link>
          <Link className='main-navigation-icon' href='/settings'>
            <ListItem button>
              <ListItemIcon>
                {SETTINGS_ICON}
              </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItem>
          </Link>
        </div>
        <div className='logout'>
          <ListItem button onClick={() => logout()}>
            <ListItemIcon>
              {LOGOUT_ICON}
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </div>
      </div>
      <div className='nested-main-menu__minimize' onClick={() => onMinimizeClicked()}>
        {isMainMenuMinimized ? (
          <>{CHEVRON_RIGHT_ICON}</>
        ) : (
          <>{CHEVRON_LEFT_ICON}</>
        )}
      </div>
    </List>
  );
}
