import cookies from 'js-cookie'

export const getUserFromCookie = () => {
  console.log({ cookies });
  const cookie = cookies.get('auth');
  console.log({ cookie });
  if (!cookie) {
    return
  }
  return JSON.parse(cookie)
}

export const setUserCookie = (user) => {
  console.log({ 'setUserCookie user': user });
  cookies.set('auth', 'setting user here', {
    // firebase id tokens expire in one hour
    // set cookie expiry to match
    expires: 1 / 24,
  })
}

export const removeUserCookie = () => cookies.remove('auth')
