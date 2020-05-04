export const NUMBER_FORMAT_FARSI = 'FARSI';
export const NUMBER_FORMAT_LATIN = 'LATIN';

export function mapToFarsi(str) {
  if(!str) return str;
  return str.toString().replace(/[1234567890١٢٣٤٥٦٧٨٩٠]/gi, e => { const c = e.charCodeAt(0); return String.fromCharCode(c + (c < 60 ? 1728 : 144)) })
}

export function mapToLatin(str) {
  if(!str) return str;
  return str.toString().replace(/[۱۲۳۴۵۶۷۸۹۰١٢٣٤٥٦٧٨٩٠]/gi, e => { const c = e.charCodeAt(0); return String.fromCharCode(c - (c < 1770 ? 1584 : 1728)) })
}

export function stripAnyThingButDigits(str) {
  if(!str) return str;
  return str.toString().replace(/[^1234567890۱۲۳۴۵۶۷۸۹۰١٢٣٤٥٦٧٨٩٠]/gi, '');
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
