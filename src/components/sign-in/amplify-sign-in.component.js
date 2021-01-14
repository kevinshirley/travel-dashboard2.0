import React, { useRef, useState, useEffect } from 'react';
import { isNil, isEmpty } from 'ramda';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import * as actions from 'src/store/actions';
import { useAction } from 'src/store/hooks';

function AmplifySignInContainer() {
  const [user, setUser] = useState(null);
  const signIn = useAction(actions.session.signIn);

  useEffect(() => {
    // Access the user session on the client
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log("User: ", user)
        setUser(user)
      })
      .catch(err => setUser(null))
  }, []);

  useEffect(() => {
    if (!isNil(user) || !isEmpty(user)) {
      console.log('user present');
      signIn(user);
    }
  }, [user]);

  console.log('user ', user);

  return (
    <div className='c-generic-modal-form'></div>
  );
}

export default withAuthenticator(AmplifySignInContainer);
