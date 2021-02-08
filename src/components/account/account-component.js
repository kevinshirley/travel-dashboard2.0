import React from 'react';
import { isEmpty } from 'ramda';
import * as moment from 'moment';
import { useToasts } from 'react-toast-notifications';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { SPACING } from 'src/components/material-ui/icons';
import { useUser } from 'src/lib/auth/useUser';

function Account({ profile }) {
  const { email, firstName, lastName, username, createdAt } = profile;
  const { logout } = useUser();
  const { addToast } = useToasts();

  return (
    <section className="c-account">
      <div className="overlay">
        <h3>Welcome Back!</h3>
        {SPACING}
        <div className='c-account__profile'>
          {firstName && (
            <div><h5>First name:</h5> {firstName}</div>
          )}
          {SPACING}
          {lastName && (
            <div><h5>Last name:</h5> {lastName}</div>
          )}
          {SPACING}
          {email && (
            <div><h5>Email:</h5> {email}</div>
          )}
          {SPACING}
          {username && (
            <div><h5>Username:</h5> {username}</div>
          )}
          {SPACING}
          {createdAt && (
            <div><h5>Joined:</h5> {moment(createdAt.toDate()).format('LLLL')}</div>
          )}
        </div>
        {SPACING}
        <div onClick={() => {
          if (!isEmpty(profile)) {
            addToast('Logged out.', {
              appearance: 'success',
              autoDismiss: true, 
            });
            logout();
          }
        }} type='button'>
          <RoundedButton className='logout-cta' text='Logout' />
        </div>
      </div>
    </section>
  );
}

export default Account;
