export default function parseSearch (string) {
  
  const obj = {}
  if (!string) return {};
  const array = string.slice(1).split('&');
  
  for(let key of array) {
    if (!key) continue;
    const s = key.split('=');
    if (!s[0] || !s[1]) continue;
    obj[s[0]] = decodeURI(s[1]) // in case uri contains Chinese character
  }

  return obj
}