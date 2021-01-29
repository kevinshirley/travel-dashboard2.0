import 'firebase/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import firebase from 'firebase/app'
import initFirebase from './initFirebase'
import { mapUserData } from './mapUserData'
import { useAction } from 'src/store/hooks';
import * as actions from 'src/store/actions';

initFirebase();

const useUser = () => {
  const [user, setUser] = useState()
  const router = useRouter()
  const setProfile = useAction(actions.session.setProfile);

  const logout = async () => {
    setProfile({});
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        router.push('/')
      })
      .catch((e) => {
        console.error(e)
      })
  }

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (user) => {
        if (user) {
          const userData = await mapUserData(user)
          setUser(userData)
        } else {
          setUser()
        }
      })

    return () => cancelAuthListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user, logout }
}

export { useUser }
