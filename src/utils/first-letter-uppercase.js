export default (param) => {
  if (typeof param === 'string') {
    return param.charAt(0).toUpperCase() + param.slice(1);
  }

  return null;
}
