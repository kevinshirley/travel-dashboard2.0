export const toUpperFirst = (param) => {
  if (typeof param === 'string') {
    return param.charAt(0).toUpperCase() + param.slice(1);
  }

  return null;
}

export const toUpperFirstEach = (param) => {
  let str;
  if (typeof param === 'string') {
    if (param.indexOf('-') > 0) {
      str = dashToSpace(param);
    } else {
      str = param;
    }

    let splitString = str.split(" ");
    splitString = splitString.map(s => toUpperFirst(s));
    return splitString.toString().replace(',', ' ');
  }

  return null;
}

export const spaceToDash = (string) => {
  if (string.indexOf(' ') > 0) {
    return string.replace(/\s+/g, '-');
  }

  return string;
}

export const dashToSpace = (string) => {
  if (string.indexOf('-') > 0) {
    const data = string.replace(/-/g, ' ');
    return data;
  }

  return string;
}

export const colonToDash = (param) => {
  let str;
  if (typeof param === 'string') {
    if (param.indexOf(':') > 0) {
      str = param.toString().replace(/:/g, '-');
    } else {
      str = param;
    }

    return str;
  }

  return null;
}

export const toUsdPrice = (param) => {
  if (typeof param === 'string') {
    return `$${param}`;
  }

  return null;
}

export const camelCaseToNormal = (param) => {
  if (typeof param === 'string') {
    const result = param.replace( /([A-Z])/g, " $1" );
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  return null;
}

export const firstLetterOfEach = (param) => {
  let str;
  if (typeof param === 'string') {
    if (param.indexOf('-') > 0) {
      str = dashToSpace(param);
    } else {
      str = param;
    }

    let splitString = str.split(" ");
    splitString = splitString.map(s => s.substr(0, 1));
    return splitString.toString().replace(',', '');
  }

  return null;
}

export const removeComma = (param) => {
  let str;
  if (typeof param === 'string') {
    if (param.indexOf(',') > 0) {
      str = param.toString().replace(/,/g, '');
    } else {
      str = param;
    }

    return str;
  }

  return null;
}

export const formatPrice = price => price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
