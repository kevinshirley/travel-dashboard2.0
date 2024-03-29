import { PERSON_OUTLINE_ICON } from 'src/components/material-ui/icons';
import { indexedObjectToArray } from 'src/utils/object';

const Customers = () => {
  const obj = {
    0: {
      id: 'customer-id-0',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_OUTLINE_ICON,
      trips: [],
      isOnline: true,
    },
    1: {
      id: 'customer-id-1',
      firstName: 'Eric',
      lastName: 'Doe',
      email: 'ericdoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_OUTLINE_ICON,
      trips: [],
      isOnline: false,
    },
    2: {
      id: 'customer-id-2',
      firstName: 'Diana',
      lastName: 'Doe',
      email: 'dianadoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_OUTLINE_ICON,
      trips: [],
      isOnline: true,
    },
    3: {
      id: 'customer-id-3',
      firstName: 'Chrishelle',
      lastName: 'Doe',
      email: 'chrishelledoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_OUTLINE_ICON,
      trips: [],
      isOnline: false,
    },
    4: {
      id: 'customer-id-4',
      firstName: 'Gordon',
      lastName: 'Doe',
      email: 'gordondoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_OUTLINE_ICON,
      trips: [],
      isOnline: false,
    },
    5: {
      id: 'customer-id-5',
      firstName: 'Michelle',
      lastName: 'Doe',
      email: 'michelledoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_OUTLINE_ICON,
      trips: [],
      isOnline: true,
    },
    6: {
      id: 'customer-id-6',
      firstName: 'Nancy',
      lastName: 'Doe',
      email: 'nancydoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_OUTLINE_ICON,
      trips: [],
      isOnline: false,
    },
    7: {
      id: 'customer-id-7',
      firstName: 'Danny',
      lastName: 'Doe',
      email: 'dannydoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_OUTLINE_ICON,
      trips: [],
      isOnline: false,
    },
    8: {
      id: 'customer-id-8',
      firstName: 'Anny',
      lastName: 'Doe',
      email: 'annydoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_OUTLINE_ICON,
      trips: [],
      isOnline: false,
    },
    9: {
      id: 'customer-id-9',
      firstName: 'Paul',
      lastName: 'Doe',
      email: 'pauldoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_OUTLINE_ICON,
      trips: [],
      isOnline: false,
    },
    10: {
      id: 'customer-id-10',
      firstName: 'Keke',
      lastName: 'Doe',
      email: 'kekedoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_OUTLINE_ICON,
      trips: [],
      isOnline: false,
    },
    11: {
      id: 'customer-id-11',
      firstName: 'Darryl',
      lastName: 'Doe',
      email: 'darryldoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_OUTLINE_ICON,
      trips: [],
      isOnline: false,
    },
    12: {
      id: 'customer-id-12',
      firstName: 'Sisi',
      lastName: 'Doe',
      email: 'sisidoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_OUTLINE_ICON,
      trips: [],
      isOnline: false,
    },
    13: {
      id: 'customer-id-13',
      firstName: 'Jenny',
      lastName: 'Doe',
      email: 'jennydoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_OUTLINE_ICON,
      trips: [],
      isOnline: false,
    },
    14: {
      id: 'customer-id-14',
      firstName: 'Tim',
      lastName: 'Doe',
      email: 'timdoe@test.com',
      phoneNumber: '555-555-5555',
      profileImage: PERSON_OUTLINE_ICON,
      trips: [],
      isOnline: false,
    },
  };

  return indexedObjectToArray(obj);
};

export default Customers;
