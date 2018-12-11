export var NUMBER_FORMAT_FARSI = 'FARSI';
export var NUMBER_FORMAT_LATIN = 'LATIN';

export function mapToFarsi(str) {
  if (!str) return str;
  return str.toString().replace(/[1234567890]/gi, function (e) {
    return String.fromCharCode(e.charCodeAt(0) + 1728);
  });
}

export function mapToLatin(str) {
  if (!str) return str;
  return str.toString().replace(/[۱۲۳۴۵۶۷۸۹۰]/gi, function (e) {
    return String.fromCharCode(e.charCodeAt(0) - 1728);
  });
}

export function stripAnyThingButDigits(str) {
  if (!str) return str;
  return str.toString().replace(/[^1234567890۱۲۳۴۵۶۷۸۹۰]/gi, '');
}

export function hasStringACharToGoToNext(str) {
  if (str.indexOf('.') >= 0) return true;
  if (str.indexOf(',') >= 0) return true;
  // if(str.indexOf('/')>=0) return true;
  if (str.indexOf('-') >= 0) return true;
  if (str.indexOf(';') >= 0) return true;
  if (str.indexOf('*') >= 0) return true;
  if (str.indexOf('#') >= 0) return true;
  if (str.indexOf(' ') >= 0) return true;
  if (str.indexOf('،') >= 0) return true;
  return false;
}