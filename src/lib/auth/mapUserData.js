export const mapUserData = async (user) => {
  const { uid, email } = user
  const token = await user && user.getIdToken(true);
  return {
    id: uid,
    email,
    token,
  }
}
