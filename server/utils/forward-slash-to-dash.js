const forwardSlashToDash = (param) => {
  let str;
  if (typeof param === 'string') {
    if (param.indexOf('/') > 0) {
      str = param.toString().replace(/\//g, '-');
    } else {
      str = param;
    }

    return str;
  }

  return null;
}

module.exports = forwardSlashToDash;
