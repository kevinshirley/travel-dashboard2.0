import { 
  TODAY_CALENDAR_ICON,
  HOTEL_BED_ICON,
  FLIGHT_TAKE_OFF_ICON,
  COMMUTE_ICON,
  MAP_ICON,
  BOAT_ICON,
  INFO_ICON,
} from 'src/components/material-ui/icons';
import { indexedObjectToArray } from 'src/utils/object';

const NewEvents = () => {
  const obj = {
    0: {
      id: 'flight',
      eventCategoryTab: 0,
      icon: FLIGHT_TAKE_OFF_ICON,
      text: 'Flight',
    },
    1: {
      id: 'activity',
      eventCategoryTab: 1,
      icon: TODAY_CALENDAR_ICON,
      text: 'Activity',
    },
    2: {
      id: 'accommodation',
      eventCategoryTab: 2,
      icon: HOTEL_BED_ICON,
      text: 'Accommodation',
    },
    3: {
      id: 'transportation',
      eventCategoryTab: 3,
      icon: COMMUTE_ICON,
      text: 'Transportation',
    },
    4: {
      id: 'tour',
      eventCategoryTab: 4,
      icon: MAP_ICON,
      text: 'Tour',
    },
    5: {
      id: 'cruise',
      eventCategoryTab: 5,
      icon: BOAT_ICON,
      text: 'Cruise',
    },
    6: {
      id: 'info',
      eventCategoryTab: 6,
      icon: INFO_ICON,
      text: 'Info',
    },
  };

  return indexedObjectToArray(obj);
};

export default NewEvents;
