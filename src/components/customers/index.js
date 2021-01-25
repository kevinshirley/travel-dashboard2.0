import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import Customers from 'src/components/customers/customers.component';
import PageHeader from 'src/components/common/page-header';
import { selectSessionProfile } from 'src/store/selectors/session';

import firebaseClient from 'firebase/app';
import initFirebase from 'src/lib/auth/initFirebase';
initFirebase();

function CustomersPage({
  addCustomerSuccess,
  addCustomerError,
  resetSuccess,
  resetError,
  userCustomers,
  addCustomerNoteSuccess,
  addCustomerNoteError,
}) {
  const db = firebaseClient.firestore();
  const profile = useSelector(selectSessionProfile);
  console.log({ profile });
  useEffect(() => {
    // db.collection('userClients')
    //   .onSnapshot(function(querySnapshot) {
    //     // var cities = [];
    //     querySnapshot.forEach(function(doc) {
    //         // cities.push(doc.data().name);
    //         console.log({ 'userClients fetch': doc.data() });
    //     });
    //     // console.log('Current cities in CA: ', cities.join(', '));
    //   });
    // db.collection("userClients").where("createdBy", "==", profile.id)
    //   .get()
    //   .then(function(querySnapshot) {
    //       querySnapshot.forEach(function(doc) {
    //           // doc.data() is never undefined for query doc snapshots
    //           console.log(doc.id, " => ", doc.data());
    //       });
    //   })
    //   .catch(function(error) {
    //       console.log("Error getting documents: ", error);
    //   });
    // if (profile && profile.id) {
      // db.collection("userClients")
      //   .where("createdBy", "==", profile.id)
      //   .get()
      //   .then(snap => {
      //     snap.forEach(doc => {
      //       console.log(doc.data());
      //     })
      //   });
    // }
  }, [profile]);

  return (
    <>
      <PageHeader title='Customers' />
      <ToastProvider>
        <Customers
          addCustomerSuccess={addCustomerSuccess}
          addCustomerError={addCustomerError}
          resetError={resetError}
          resetSuccess={resetSuccess}
          userCustomers={userCustomers}
          addCustomerNoteSuccess={addCustomerNoteSuccess}
          addCustomerNoteError={addCustomerNoteError}
        />
      </ToastProvider>
    </>
  );
}

CustomersPage.prototypes = {
  addCustomerError: PropTypes.object,
  addCustomerSuccess: PropTypes.object,
  resetError: PropTypes.func,
  resetSuccess: PropTypes.func,
  userCustomers: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      email: PropTypes.string,
      phoneNumber: PropTypes.string,
      profileImage: PropTypes.object,
      trips: PropTypes.array,
      isOnline: PropTypes.bool,
    }),
  ),
  addCustomerNoteSuccess: PropTypes.object,
  addCustomerNoteError: PropTypes.object,
};

export default CustomersPage;
