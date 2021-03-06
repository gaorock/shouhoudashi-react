import React from 'react';


export default function Auth () {
  const [auth, setAuth] = React.useState(false);

 

  React.useEffect(() => {
    const login = localStorage.getItem('login');
    setAuth(!!login)
  },[])


  return auth

}