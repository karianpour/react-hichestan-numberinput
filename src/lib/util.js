export const NUMBER_FORMAT_FARSI = 'FARSI';
export const NUMBER_FORMAT_LATIN = 'LATIN';

export function mapToFarsi(str) {
  if(!str) return str;
  return str.toString().replace(/[1234567890]/gi, e => String.fromCharCode(e.charCodeAt(0) + 1728))
}

export function mapToLatin(str) {
  if(!str) return str;
  return str.toString().replace(/[۱۲۳۴۵۶۷۸۹۰]/gi, e => String.fromCharCode(e.charCodeAt(0) - 1728))
}

export function stripAnyThingButDigits(str) {
  if(!str) return str;
  return str.toString().replace(/[^1234567890۱۲۳۴۵۶۷۸۹۰]/gi, '');
}

export function hasStringACharToGoToNext (str) {
  if(str.indexOf('.')>=0) return true;
  if(str.indexOf(',')>=0) return true;
  // if(str.indexOf('/')>=0) return true;
  if(str.indexOf('-')>=0) return true;
  if(str.indexOf(';')>=0) return true;
  if(str.indexOf('*')>=0) return true;
  if(str.indexOf('#')>=0) return true;
  if(str.indexOf(' ')>=0) return true;
  if(str.indexOf('،')>=0) return true;
  return false;
}

/**
 * @param {string} str
 * @param {number} n
 */
export function repeatStr(str, n){
  let r = '';
  for(let i=0; i<n; i++){
    r += str;
  }
  return r;
}
