

export default async function authentication (token) {
  if (!token) return false;
  const url = 'http://kxp33.cnduomi.com/api/weixin/public/get_user_info';
  try {
    const response = await fetch(url, {
      headers: {
        'XX-Device-Type': 'mobile',
        'XX-Token': token
      },
      method: 'POST'
    });
    const json = await response.json();
    // console.log(json)

    if (json.code === 1) {
      // authenticated!
      // console.log('login ok!')
      return json.data;
    } else {
      // console.log('login not ok!!');
      // localStorage.removeItem('token');
      return false
    }
    
  }catch(e) {
    return false
  }
}