export const mapUserData = async (user) => {
  console.log('mapUserData user', user);
  const { uid, email } = user
  const token = await user && user.getIdToken(true);
  return {
    id: uid,
    email,
    token,
  }
}
