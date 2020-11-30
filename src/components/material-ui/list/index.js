import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ADD_ITINERARY, MANAGE_ITINERARY } from 'src/store/constants/url';
import { useRouter } from 'next/router';

export default function SimpleList({ 
  addEventToDay,
  dayToDay,
  list = [],
  onBlur,
  isVisible,
  closeNewEventList,
  addEventToUpdatingDay,
}) {
  const router = useRouter();

  const listClasses = cx({
    'not-visible': !isVisible,
    'is-visible': isVisible,
  }, 'list');

  const handleClick = (event, day, icon, name) => {
    if (router.pathname === ADD_ITINERARY) {
      addEventToDay({event, day, icon, name});
    }
    if (router.pathname === MANAGE_ITINERARY) {
      addEventToUpdatingDay({event, day, icon, name});
    }
    closeNewEventList();
  };

  return (
    <div className={listClasses} onBlur={onBlur}>
      <List component='nav' aria-label='main mailbox folders'>
        {list && list.map((item, i) => (
          <ListItem 
            button
            key={i}
            onClick={() => handleClick(item.id, dayToDay.id, item.icon, item.text)}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
