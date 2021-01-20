import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { post } from 'src/utils/fetch'
import * as actions from 'src/store/actions';
import { useAction } from 'src/store/hooks';

export const getUserFromCookie = () => {
  const cookies = parseCookies();
  console.log({ cookies });
}

export const setUserCookie = async (user) => {
  // const setUserToken = useAction(actions.session.setUserToken);
  console.log({ 'setUserCookie user': user })
  // setUserToken(user);
  // console.log({ 'setUserCookie user cookie': JSON.parse(user.token) })
  // console.log({ 'setUserCookie user cookie h': user.token.h })
  // setCookie(null, 'firebaseToken', user.token, {
  //   // firebase id tokens expire in one hour
  //   // set cookie expiry to match
  //   maxAge: 1 / 24,
  //   path: '/'
  // })
  // const data = await post('/api/cookie/set', user);
  // console.log({ 'setUserCookie api call': data });
}

export const removeUserCookie = () => destroyCookie(null, 'firebaseToken')
