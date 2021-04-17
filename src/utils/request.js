


export default async function request (url, body = {}, method = 'POST') {

  const token = localStorage.getItem('token');
  if (!token) throw Error('未登录');
  // console.log('receive data:', body)
  try {
    const response = await fetch(url, {
      headers: {
        'XX-Device-Type': 'mobile',
        'XX-Token': token,
        'content-type': 'application/json',
      },
      method,
      body: JSON.stringify(body)
    });
    const json = await response.json();
    // console.log(json)

    if (json.code === 1) {
      // authenticated!
      // console.log('request json:', json)
      // console.log('request ok!')
      return json.data;
    } else {
      console.log(json)
      // console.log('request error!', json);
      // localStorage.removeItem('token');
      throw json.msg || '请求错误'
    }
    
  }catch(e) {
    console.log(e)
    throw e
  }
}