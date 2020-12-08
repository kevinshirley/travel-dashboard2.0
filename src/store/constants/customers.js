import { PERSON_ICON } from 'src/components/material-ui/icons';
import { indexedObjectToArray } from 'src/utils/object';

const Customers = () => {
  const obj = {
    0: {
      id: 'customer-id-0',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_ICON,
      trips: [],
      isOnline: true,
    },
    1: {
      id: 'customer-id-1',
      firstName: 'Eric',
      lastName: 'Doe',
      email: 'ericdoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_ICON,
      trips: [],
      isOnline: false,
    },
    2: {
      id: 'customer-id-2',
      firstName: 'Diana',
      lastName: 'Doe',
      email: 'dianadoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_ICON,
      trips: [],
      isOnline: true,
    },
    3: {
      id: 'customer-id-3',
      firstName: 'Chrishelle',
      lastName: 'Doe',
      email: 'chrishelledoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_ICON,
      trips: [],
      isOnline: false,
    },
    4: {
      id: 'customer-id-4',
      firstName: 'Gordon',
      lastName: 'Doe',
      email: 'gordondoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_ICON,
      trips: [],
      isOnline: false,
    },
    5: {
      id: 'customer-id-5',
      firstName: 'Michelle',
      lastName: 'Doe',
      email: 'michelledoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_ICON,
      trips: [],
      isOnline: true,
    },
    6: {
      id: 'customer-id-6',
      firstName: 'Nancy',
      lastName: 'Doe',
      email: 'nancydoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_ICON,
      trips: [],
      isOnline: false,
    },
  };

  return indexedObjectToArray(obj);
};

export default Customers;
