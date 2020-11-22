import React from 'react';
import RoundedButton from 'src/components/material-ui/rounded-button';
import { SPACING } from 'src/components/material-ui/icons';
import * as moment from 'moment';

function Account({ logout, profile }) {
  const { email, firstName, lastName, username, createdAt } = profile;
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
            <div><h5>Joined:</h5> {moment.utc(createdAt).format('LLLL')}</div>
          )}
        </div>
        {SPACING}
        <div onClick={() => logout()} type='button'>
          <RoundedButton className='logout-cta' text='Logout' />
        </div>
      </div>
    </section>
  );
}

export default Account;
