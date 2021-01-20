import { serialize, CookieSerializeOptions } from 'cookie'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

/**
 * This sets `cookie` using the `res` object
 */

// export const setCookie = (
//   res,
//   name,
//   value,
//   options
// ) => {
//   const stringValue =
//     typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

//   if ('maxAge' in options) {
//     options.expires = new Date(Date.now() + options.maxAge)
//     options.maxAge /= 1000
//   }

//   res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
// }

const handler = (req, res) => {
  console.log('req.body', req.body);
  // Calling our pure function using the `res` object, it will add the `set-cookie` header
  // setCookie(res, 'Next.js', 'api-middleware!')
  setCookie({ req, res }, 'FirebaseUserToken', 'user.token', {
    // firebase id tokens expire in one hour
    // set cookie expiry to match
    maxAge: 1 / 24,
    path: '/'
  })
  // Return the `set-cookie` header so we can display it in the browser and show that it works!
  res.end(res.getHeader('FirebaseUserToken'))
}

export default handler